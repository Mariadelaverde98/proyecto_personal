const mongoose = require("mongoose");

const chatPlantilla = {
  idUsuarios: Array,
  users: Array
};

const chatSchema = mongoose.Schema(chatPlantilla, {
  versionKey: false,
});

const Chat = mongoose.model("chat", chatSchema);

module.exports = Chat;
