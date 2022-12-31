const conexion = require("../databases/mysql");
const userModel = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const bcryptjs = require('bcryptjs');
const { Op } = require("sequelize");

const users = {
    /**
     * Funcion que inserta un registro en la tabla users de la base de datos 
     * de mySQL. En caso de que el email y el nombre de usario no esten repetidos,
     * la funcion devuelve un json con los datos del usuario registrado. En caso de
     * el email este repetido, se devuelve "email repe" y si el nombre de usuario
     * esta repetido, se devuelve "nombre user repe". Una vez se haya insertado el 
     * usuario, se crea una cookie con el JWT del email.
     * @param {json} req req.body = {
     *     name_: "nombre",
     *     username : "nombredeusuario",
     *     email : "email@dominio.com",
     *     password_: "1234"
     * }
     * @param {json} res 
     */
    insert: async (req, res) => {
        try {
            const { name_, username, email, password_ } = req.body;
            let con = await conexion.abrir();
            const user = await userModel.create(con);
            let userr = await user.create({ name_, username, email, password_: await bcryptjs.hash(password_, 8) })
            await conexion.cerrar(con);
            res.cookie("infoJwt", jwt.sign({ email: req.body.email }, "m4riAL4M3j0r"));
            res.json(userr);
        } catch (ValidationError) {
            if (ValidationError.fields && ValidationError.fields.email) {
                res.json("email repe");
            } else if (ValidationError.fields && ValidationError.fields.username) {
                res.json("nombre user repe");
            }
        }
    },

    login: async (req, res) => {
        let con = await conexion.abrir();
        const userr = await userModel.create(con);
        const user = await userr.findOne({ where: { "email": req.body.email } });
        await conexion.cerrar(con);
        if (user) {
            if (bcryptjs.compareSync(req.body.password_, user.dataValues.password_)) { //compara la contraseña encriptada en la base de datos con la contraseña introducida
                res.cookie("infoJwt", jwt.sign({ email: req.body.email }, "m4riAL4M3j0r"));
                res.json("ok");
            } else {
                res.json("password incorrecta");
            }
        } else {
            res.json("email incorrecto");
        }
    },

    logout: (req, res) => {
        res.clearCookie("infoJwt");
        res.json("ok");
    },

    setProfilePhoto: async (req, res) => {
        let con = await conexion.abrir();
        const user = await userModel.create(con);
        let infojwt = await users.emailSesion(req, res);
        await user.update({ photo_profile: req.body.photo }, { where: { email: infojwt.email } });
        await conexion.cerrar(con);
    },

    userSesion: async (req, res) => {
        let con = await conexion.abrir();
        const userr = await userModel.create(con);
        let infojwt = await users.emailSesion(req, res);
        let user = await userr.findOne({ where: { "email": infojwt.email } });
        await conexion.cerrar(con);
        res.json(user);
    },

    emailSesion: (req, res) => {
        var cookies = req.cookies;
        var token = cookies.infoJwt;
        let jwtVerify = jwt.verify(token, "m4riAL4M3j0r");
        return jwtVerify;
    },

    searchUsers: async (req, res) => {
        let con = await conexion.abrir();
        const user = await userModel.create(con);
        let users = await user.findAll({ limit: 10, where: { "username": { [Op.like]: `${req.body.username}%` } } });
        await conexion.cerrar(con);
        res.json(users);
    },
}



module.exports = users;