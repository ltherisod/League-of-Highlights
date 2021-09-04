const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  password: String,
  username: { type: String },
  guest: { type: Boolean, required: true, default: true },
  topChampions: [{ type: mongoose.Types.ObjectId, ref: "champion" }],
  rank: { type: String },
  division: String,
  icon: { type: String },
  videos: [{ type: mongoose.Types.ObjectId, ref: "video" }],
  reports: [{ type: mongoose.Types.ObjectId, ref: "report" }],
})

const User = mongoose.model("user", userSchema)

module.exports = User
