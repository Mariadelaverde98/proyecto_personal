const commentsModel = require("../models/comentsModel");

const comment = {

    /**
     * Inserta un registro en la tabla comments de la base de datos
     * donde todos los campos se pasan en el body de la peticion.
     * @param {*} req 
     * @param {*} res 
     */
    insert: async (req, res) => {
        try {
            const { idUser, idPublication, username, text } = req.body
            const date = new Date(Date.now());
            const dateString = date.toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            });
            res.json(await commentsModel.create({ idUser, username, date: dateString, comment: text, idPublication }))
        } catch (error) {
            console.log(error);
            res.json(error)
        } 
    },

    /**
     * Devuelve todos los comentarios de una publicacion cuyo
     * id se pasa como parametro de la peticion get.
     * @param {*} req 
     * @param {*} res 
     */
    get: async (req, res) => {
        try {
            res.json(await commentsModel.find({ idPublication: req.params.id }));
        } catch (error) {
            console.log(error);
            res.json(error);
        } 
    },
    /* deleteComment: async (req, res) => {
        try {
            const { _id, _id_coment } = req.body
            const image = await Images.updateOne({ _id }, { $pull: { coments: { _id: mongoose.Types.ObjectId(_id_coment) } } })
            res.json(image)
        } catch (error) {
            res.json(error)
        } 
    }, */
}

module.exports = comment;