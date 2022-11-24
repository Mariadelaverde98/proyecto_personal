const sql = require("../databases/mysql");
const Followers = require("../models/followersModel");
const jwt = require("jsonwebtoken");
const Users = require("../models/usersModel");

const follower = {
    /**
     * Funcion que inserta un registro en la tabla followers de la base de datos 
     * de mySQL. En otras palabras, registra que el usuario que tiene la sesion iniciada ha seguido a
     * otro usuario.
     * @param {json} req 
     * @param {json} res 
     */
    follow: async (req, res) => {
        try {
            let jwtVerify = jwt.verify(req.cookies.infoJwt, "m4riAL4M3j0r")
            let conexion = await sql.sqlConexion();
            let user = await Users.findOne({ where: { email: jwtVerify.email } });
            res.json(await Followers.create({ fk_pk_user: req.body.fk_pk_user, fk_pk_user_follower: user.dataValues.id }));
            conexion.close();
        } catch (error) {
            res.json(error);
        }
    },

    unfollow: async (req, res) => {
        try {
            let jwtVerify = jwt.verify(req.cookies.infoJwt, "m4riAL4M3j0r")
            let conexion = await sql.sqlConexion();
            let user = await Users.findOne({ where: { email: jwtVerify.email } });
            res.json(await Followers.destroy({ where: {fk_pk_user: req.body.fk_pk_user, fk_pk_user_follower: user.dataValues.id }}));
            conexion.close();
        } catch (error) {
            res.json(error);
        }
    },
}



module.exports = follower;