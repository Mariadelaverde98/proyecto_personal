const chatModel = require("../models/chatsModel");
const users = require("../controllers/users.controllers");
const UserModel = require("../models/usersModel");
const msgChatModel = require("../models/msgsChatsModel");

const chat = {

    /**
     * Busca un chat entre el usuario que tiene la sesion iniciada y otro
     * cuyo id se pasa como parametro en la peticion. En caso de existir este
     * chat, lo retorna y en caso contrario, lo crea y lo retorna.
     * @param {*} req 
     * @param {*} res 
     */
    getChat: async (req, res) => {
        try {
            let user1 = users.emailSesion(req);
            var con = await conexion.abrir();
            const userM = await UserModel.create(con);
            user1 = await userM.findOne({ where: { email: user1 } });
            let user2 = await userM.findOne({ where: { id: req.params.id } });
            let chat = await chatModel.findOne({ idUsuarios: { $all: [parseInt(user1.id), parseInt(req.params.id)] } });
            if (!chat) {
                chat = await chatModel.create({ idUsuarios: [parseInt(user1.id), parseInt(req.params.id)], users: [user1, user2] });
            }
            res.json(chat);
        } catch (error) {
            res.json(error);
        } finally {
            await conexion.cerrar(con);
        }
    },

    /**
     * Devuelve todos los chats que tiene activos el usuario con la sesion
     * iniciada.
     * @param {*} req 
     * @param {*} res 
     */
    getAllChats: async (req, res) => {
        try {
            let user1 = users.emailSesion(req);
            var con = await conexion.abrir();
            const userM = await UserModel.create(con);
            user1 = await userM.findOne({ where: { email: user1 } });
            await conexion.cerrar(con);
            let chats = await chatModel.find({ idUsuarios: { $in: [user1.id] } });
            chats = await Promise.all(chats.map(async chat => {
                let msgs = await msgChatModel.find({ idChat: chat._id});
                return {chat, msgs};
            }))
            res.json(chats);
        } catch(e) {
            console.log(e)
        }
    }
};

module.exports = chat;