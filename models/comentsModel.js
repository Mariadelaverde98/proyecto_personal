const mongoose = require("mongoose");

const commentPlantilla = {
  idUser: Number,
  idPublication: Number,
  comment: String,
  date: Date
};

const commentSchema = mongoose.Schema(commentPlantilla, {
  versionKey: false,
});

const comment = mongoose.model("comments", commentSchema);

module.exports = comment;
