const mongoose = require("mongoose")

const championSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  riotKey: { type: String, required: true },
  tags: [{ type: mongoose.Types.ObjectId, ref: "role" }],
  avatar: { type: String },
})

const Champion = mongoose.model("champion", championSchema)

module.exports = Champion
