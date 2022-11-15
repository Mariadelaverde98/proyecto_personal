const sql = require("../databases/mysql");
const Users = require("../models/usersModel")


/* async function insertaUser(nombre, nombre_usuario, email, contrasenia) {
    await Users.create({ nombre, nombre_usuario, email, contrasenia });
} */

const users = {
    insert : async (req, res) => {
        const {nombre, nombre_usuario, email, contrasenia } = req.body;
        let conexion = sql.sqlConexion();
        await Users.create({ nombre, nombre_usuario, email, contrasenia });
        conexion.close()
        res.json("insert");
    }
}



module.exports = users;