const mongoose = require("mongoose")

const chatRoomSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  messages: [
    { author: { type: mongoose.Types.ObjectId, ref: "user" }, message: String },
  ],
  title: String,
  tags: [String],
})

const ChatRoom = mongoose.model("chat", chatRoomSchema)

module.exports = ChatRoom
