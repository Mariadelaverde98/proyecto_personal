const conexion = require("../databases/mysql");
const publicationsModel = require("../models/publicationsModel");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/usersModel");
const tag = require("./tags.controllers");

const publication = {
    /**
     * Funcion que inserta un registro en la tabla publications de la base de datos 
     * de mySQL. 
     * @param {json} req 
     * @param {json} res 
     */
    insert: async (req, res) => {
        try {
            let jwtVerify = jwt.verify(req.cookies.infoJwt, "m4riAL4M3j0r");
            var con = await conexion.abrir();
            const userM = await UserModel.create(con);
            let user = await userM.findOne({ where: { email: jwtVerify.email } });
            const publicationM = await publicationsModel.create(con);
            const { title, publication_path } = req.body;
            res.json(await publicationM.create({ fk_pk_user: user.dataValues.id, title, publication_path }));
        } catch (error) {
            console.log(error);
        } finally {
            await conexion.cerrar(con);
        }
    },

    /**
     * Devuelvo todas las publicaciones en las que esta etiquetado el usuario con la sesion iniciada.
     * @param {*} req 
     * @param {*} res 
     */
    getPublicationsUser: async (req, res) => {
        try {
            let jwtVerify = jwt.verify(req.cookies.infoJwt, "m4riAL4M3j0r");
            var con = await conexion.abrir();
            const userM = await UserModel.create(con);
            let user = await userM.findOne({ where: { email: jwtVerify.email } });
            const publicationM = await publicationsModel.create(con);
            let tags = await tag.getTags(user.id, con);
            const publications = await Promise.all(
                tags.map(async (tag) => {
                  var t = await publicationM.findOne({ where: { id: tag.fk_pk_publication } });
                  return t.dataValues;
                })
              )
            res.json(publications);
        } catch (error) {
            console.log(error);
        } finally {
            await conexion.cerrar(con);
        }
    },

    getPublicationsUser2: async (req, res) => {
        try {
            var con = await conexion.abrir();
            const userM = await UserModel.create(con);
            let user = await userM.findOne({ where: { id: req.params.id } });
            const publicationM = await publicationsModel.create(con);
            let tags = await tag.getTags(user.id, con);
            const publications = await Promise.all(
                tags.map(async (tag) => {
                  var t = await publicationM.findOne({ where: { id: tag.fk_pk_publication } });
                  return t.dataValues;
                })
              )
            res.json(publications);
        } catch (error) {
            console.log(error);
        } finally {
            await conexion.cerrar(con);
        }
    }
}



module.exports = publication;