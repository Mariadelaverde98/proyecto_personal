const mongoose = require("mongoose");

const chatPlantilla = {
  idUsuarios: Array
};

const chatSchema = mongoose.Schema(chatPlantilla, {
  versionKey: false,
});

const Chat = mongoose.model("chat", chatSchema);

module.exports = Chat;
