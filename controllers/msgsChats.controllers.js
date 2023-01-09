const msgChatModel = require("../models/msgsChatsModel");
const users = require("./users.controllers");
const UserModel = require("../models/usersModel");

const msgChat = {
    /**
     * Funcion que devuelve todos los mensages de un chat cuyo 
     * id se pasa como parametro de la peticion get.
     * @param {*} req 
     * @param {*} res 
     */
    getMsgs: async (req, res) => {
        let msgChat = await msgChatModel.find({ idChat: req.params.id});
        res.json(msgChat);
    },

    /**
     * Funcion que inserta un registro en la tabla msgsChat de la base de datos
     * de mongo.
     * @param {*} req 
     * @param {*} res 
     */
    insert: async (req, res) => {
        let user1 = users.emailSesion(req);
        var con = await conexion.abrir();
        const userM = await UserModel.create(con);
        let user = await userM.findOne({ where: { email: user1 } });
        await conexion.cerrar(con);
        let msgChat = await msgChatModel.create({ idChat:req.body.idChat, msg: req.body.msg, idUser: user.dataValues.id, date: "fecha"});
        res.json(msgChat);
    }
};

module.exports = msgChat;