const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  password: String,
  guest: { type: Boolean, required: true, default: true },
  admin: { type: Boolean, default: false },
  google: { type: Boolean, default: false },
  verified: { type: Boolean, default: false },
  verifyCode: { type: String, required: true },
  username: { type: String },
  topChampions: [{ type: mongoose.Types.ObjectId, ref: "champion" }],
  rank: { type: mongoose.Types.ObjectId, ref: "rank" },
  division: String,
  icon: {
    type: String,
    default:
      "http://pm1.narvii.com/7529/efc9424d7d0651de3913bfc1a426e98c4836f627r1-200-200v2_uhq.jpg",
  },
  videos: [{ type: mongoose.Types.ObjectId, ref: "video" }],
  reports: [
    { user: { type: mongoose.Types.ObjectId, ref: "user" }, content: String },
  ],
})

const User = mongoose.model("user", userSchema)

module.exports = User
