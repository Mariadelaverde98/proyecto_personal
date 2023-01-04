const mongoose = require("mongoose");

const msgsChatsPlantilla = {
  idUser: Number,
  msg: String,
  date: String,
  idChat: String
};

const msgsChatSchema = mongoose.Schema(msgsChatsPlantilla, {
  versionKey: false,
});

const MsgChat = mongoose.model("msgsChat", msgsChatSchema);

module.exports = MsgChat;
