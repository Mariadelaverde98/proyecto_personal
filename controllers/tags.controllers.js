const conexion = require("../databases/mysql");
const tagsModel = require("../models/tagsModel");
const jwt = require("jsonwebtoken");
const publicationsModel = require("../models/publicationsModel");

const tag = {
    /**
     * Funcion que inserta un registro en la tabla tags de la base de datos 
     * de mySQL. 
     * @param {json} req 
     * @param {json} res 
     */
    insert: async (req, res) => {
        try {
            var con = await conexion.abrir();
            const tagM = await tagsModel.create(con);
            const { users, fk_pk_publication } = req.body;
            console.log(typeof (users))
            console.log(typeof ([]))
            await Promise.all(users.map(async user => {
                await tagM.create({ fk_pk_user: user.id, fk_pk_publication });
            }))
            res.json(true);
        } catch (error) {
            console.log(error);
        } finally {
            await conexion.cerrar(con);
        }
    },

    /**
     * Funcion que devuelve los ids de las publicaciones en las
     * que esta etiquetado el usuario con la sesion iniciada.
     * @param {*} id 
     * @param {*} con 
     * @returns 
     */
    getTags: async (id, con) => {
        const tagM = await tagsModel.create(con);
        return await tagM.findAll({ where: { fk_pk_user: id, tag_accepted: 1 } })
    },

    /**
     * Devuelve todas las etiquetas que tengan el campo tag_accepted
     * a null. Es decir, todas las etiquetas que esten pendientes 
     * de ser aceptadas o rechazadas.
     * @param {*} req 
     * @param {*} res 
     */
    getTagsSolicitudes: async (req, res) => {
        try {
            var con = await conexion.abrir();
            const tagM = await tagsModel.create(con);
            var cookies = req.cookies;
            var token = cookies.infoJwt;
            let id = jwt.verify(token, "m4riAL4M3j0r").id;
            let tags = await tagM.findAll({ where: { fk_pk_user: id, tag_accepted: null } });
            const publicationM = await publicationsModel.create(con);
            tags = await Promise.all(
                tags.map(async (tag) => {
                    var publi = await publicationM.findOne({ where: { id: tag.fk_pk_publication } });
                    return { tag, publi };
                })
            )
            res.json(tags);
        } catch (error) {
            console.log(error);
            res.json(error)
        } finally {
            await conexion.cerrar(con);
        }
    },

    /**
     * Funcion que actualiza el campo tag_accepted a 0 o 1 (dependiendo
     * de lo que venga en el body de la peticion). Es decir, acepta o 
     * rechaza una etiqueta.
     * @param {*} req 
     * @param {*} res 
     */
    updateTag: async (req, res) => {
        try {
            var con = await conexion.abrir();
            const tagM = await tagsModel.create(con);
            await tagM.update({ tag_accepted: req.body.estado }, {where: {id: req.body.id}});
            res.json(true);
        } catch (error) {
            console.log(error);
        } finally {
            await conexion.cerrar(con);
        }
    },
}



module.exports = tag;