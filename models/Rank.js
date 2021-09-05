const mongoose = require("mongoose")

const rankSchema = new mongoose.Schema({
  name: String,
  image: String,
})

const Rank = mongoose.model("rank", rankSchema)

module.exports = Rank
