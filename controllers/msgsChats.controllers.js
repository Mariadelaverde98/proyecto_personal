const msgChatModel = require("../models/msgsChatsModel");
const users = require("./users.controllers");
const UserModel = require("../models/usersModel");

const msgChat = {
    getMsgs: async (req, res) => {
        let msgChat = await msgChatModel.find({ idChat: req.params.id});
        res.json(msgChat);
    },
    insert: async (req, res) => {
        let user1 = users.emailSesion(req);
        var con = await conexion.abrir();
        const userM = await UserModel.create(con);
        let user = await userM.findOne({ where: { email: user1 } });
        await conexion.cerrar(con);
        let msgChat = await msgChatModel.create({ msg: req.body.msg, idUser: user.dataValues.id, date: "fecha"});
        res.json(msgChat);
    }
};

module.exports = msgChat;