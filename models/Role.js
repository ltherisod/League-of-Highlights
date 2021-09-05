const mongoose = require("mongoose")

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
})

const Role = mongoose.model("role", roleSchema)

module.exports = Role
