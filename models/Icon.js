const mongoose = require("mongoose")

const iconSchema = new mongoose.Schema({
  riotKey: Number,
  image: String,
})

const Icon = mongoose.model("icon", iconSchema)

module.exports = Icon
