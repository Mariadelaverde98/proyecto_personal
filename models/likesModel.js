const mongoose = require("mongoose");

const likePlantilla = {
  idUser: Number,
  idPublication: Number
};

const likeSchema = mongoose.Schema(likePlantilla, {
  versionKey: false,
});

const like = mongoose.model("likes", likeSchema);

module.exports = like;
