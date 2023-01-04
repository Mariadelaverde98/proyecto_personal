const chatModel = require("../models/chatsModel");
const users = require("../controllers/users.controllers");
//require("../databases/mongo");

const chat = {
    getChat: async (req, res) => {
        let user1 = users.emailSesion(req);
        var con = await conexion.abrir();
        const userM = await UserModel.create(con);
        user1 = await userM.findOne({ where: { email: user1 } });
        await conexion.cerrar(con);
        //let user2 = await userM.findOne({ where: { email: req.body.id } });
        let chat = await chatModel.find({ idUsuarios: {$all: [user1.id, req.params.id]} });
        if (!chat) {
            chat = await chatModel.create({idUsuarios: [user1.id, req.params.id]});
        } 
        res.json(chat);
    },
    getAllChats: async (req, res) => {
        let user1 = users.emailSesion(req);
        var con = await conexion.abrir();
        const userM = await UserModel.create(con);
        user1 = await userM.findOne({ where: { email: user1 } });
        await conexion.cerrar(con);
        //let user2 = await userM.findOne({ where: { email: req.body.id } });
        let chats = await chatModel.find({ idUsuarios: {$in: [user1.id]} });
        res.json(chats);
    },
    deleteTarea: async (req, res) => {
        const { nombreTarea } = req.body;
        const deleteTarea = await tareaModel.deleteOne({ nombreTarea });
        res.json(deleteTarea);
    },
    deleteAllTareas: async (req, res) => {
        const { idUsuario } = req.body;
        console.log(idUsuario);
        const deleteAllTareas = await tareaModel.delete({
            where: { idUsuario },
        });
        res.json(deleteAllTareas);
    },
    updateTareas: async (req, res) => {
        const { id, nombreTarea } = req.body;
        let filter = { _id: id };
        let update = { nombreTarea };
        const updateTarea = await tareaModel.findByIdAndUpdate(filter, update);
        res.json(updateTarea);
    },
};

module.exports = chat;