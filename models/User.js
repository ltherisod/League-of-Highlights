const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  password: String,
  username: { type: String },
  guest: { type: Boolean, required: true, default: true },
  admin: { type: Boolean, default: false },
  topChampions: [{ type: mongoose.Types.ObjectId, ref: "champion" }],
  rank: { type: mongoose.Types.ObjectId, ref: "rank" },
  division: String,
  icon: { type: String, default: Math.round(Math.random() * 15) },
  videos: [{ type: mongoose.Types.ObjectId, ref: "video" }],
  reports: [{ type: mongoose.Types.ObjectId, ref: "report" }],
})

const User = mongoose.model("user", userSchema)

module.exports = User
