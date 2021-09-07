const ChatRoom = require("../models/ChatRoom")

const chatRoomControllers = {
  createChatRoom: async (req, res) => {
    try {
      res.json({ success: true, response: "Sala creada", error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
}

module.exports = chatRoomControllers
