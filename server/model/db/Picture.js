const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  src: { type: String, required: true },
});

module.exports = mongoose.model("Picture", PictureSchema);