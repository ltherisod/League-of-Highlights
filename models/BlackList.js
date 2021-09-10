const mongoose = require("mongoose")

const blackListSchema = new mongoose.Schema({
  email: { type: String }, // acá va el mail de los usuarios en blacklist.
})

const BlackList = mongoose.model("blacklist", blackListSchema)

module.exports = BlackList
