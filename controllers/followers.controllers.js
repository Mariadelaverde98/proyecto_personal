const conexion = require("../databases/mysql");
const followerModel = require("../models/followersModel");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/usersModel");

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
            let jwtVerify = jwt.verify(req.cookies.infoJwt, "m4riAL4M3j0r");
            var con = await conexion.abrir();
            const userM = await UserModel.create(con);
            let user = await userM.findOne({ where: { email: jwtVerify.email } });
            const followerM = await followerModel.create(con);
            res.json(await followerM.create({ fk_pk_user: req.body.fk_pk_user, fk_pk_user_follower: user.dataValues.id }));
        } catch (error) {
            console.log(error);
        } finally {
            await conexion.cerrar(con);
        }
    },

    unfollow: async (req, res) => {
        try {
            let jwtVerify = jwt.verify(req.cookies.infoJwt, "m4riAL4M3j0r")
            var con = await conexion.abrir();
            const userM = await UserModel.create(con);
            let user = await userM.findOne({ where: { email: jwtVerify.email } });
            const followerM = await followerModel.create(con);
            res.json(await followerM.destroy({ where: {fk_pk_user: req.body.fk_pk_user, fk_pk_user_follower: user.dataValues.id }}));
        } catch (error) {
            res.json(error);
        } finally {
            await conexion.cerrar(con);
        }
    },

    /**
     * Funcion que devuelve true si el usuario que tiene la sesion iniciada esta siguiendo
     * al usuario cuyo id se pasa en la peticion o false en el caso contrario.
     * @param {*} req 
     * @param {*} res 
     */
    isFollowing: async (req, res) =>{ 
        try {
            let jwtVerify = jwt.verify(req.cookies.infoJwt, "m4riAL4M3j0r");
            var con = await conexion.abrir();
            const userM = await UserModel.create(con);
            let user = await userM.findOne({ where: { email: jwtVerify.email } });
            const followerM = await followerModel.create(con);
            let following = await followerM.findOne({ where: {fk_pk_user: req.body.fk_pk_user, fk_pk_user_follower: user.dataValues.id} });
            following ? res.json(true): res.json(false);
        } catch (error) {
            res.json(error);
        } finally {
            await conexion.cerrar(con);
        }
    }
}



module.exports = follower;