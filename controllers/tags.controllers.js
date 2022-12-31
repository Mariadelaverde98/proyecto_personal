const conexion = require("../databases/mysql");
const tagsModel = require("../models/tagsModel");

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

    getTags: async (id, con) => {
        const tagM = await tagsModel.create(con);
        return await tagM.findAll({ where: { fk_pk_user: id } })
    },
}



module.exports = tag;