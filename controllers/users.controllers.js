const sql = require("../databases/mysql");
const Users = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const bcryptjs = require('bcryptjs');

const users = {
    /**
     * Funcion que inserta un registro en la tabla users de la base de datos 
     * de mySQL.
     * @param {json} req 
     * @param {json} res 
     */
    insert: async (req, res) => {
        try {
            const { name_, username, email, password_ } = req.body;
            let conexion = await sql.sqlConexion();
            res.json(await Users.create({ name_, username, email, password_: await bcryptjs.hash(password_, 8) }));
            conexion.close()
        } catch (ValidationError) {
            if (ValidationError.fields && ValidationError.fields.email) {
                res.send("email repe");
            } else if (ValidationError.fields && ValidationError.fields.username) {
                res.send("nombre user repe");
            } else {
                res.json(ValidationError);
            }
        }
    },

    login: async (req, res) => {
        let conexion = await sql.sqlConexion();
        const user = await Users.findOne({ where: { "email": req.body.email } });
        conexion.close();
        if (user) {
            if (bcryptjs.compareSync(req.body.password_, user.dataValues.password_)) { //compara la contraseña encriptada en la base de datos con la contraseña introducida
                res.cookie("infoJwt", jwt.sign({ email: req.body.email }, "m4riAL4M3j0r"));
                res.send("ok");
            } else {
                res.json("password incorrecta");
            }
        } else {
            res.json("email incorrecto");
        }
    },

    logout: (req, res) => {
        res.clearCookie("infoJwt");
        res.send("ok");
    }
}



module.exports = users;