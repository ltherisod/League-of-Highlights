const Rank = require("../models/Rank")

const ranksControllers = {
  addRank: async (req, res) => {
    try {
      const { name, image } = req.body
      const rank = new Rank({ name, image })
      await rank.save()
      res.json({ success: true, response: rank, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  getRanks: async (req, res) => {
    const ranks = await Rank.find()
    res.json({ response: ranks })
  },
  updateRank: async (req, res) => {
    try {
      const rank = await Rank.findOneAndUpdate(
        { _id: req.body.id },
        { image: req.body.image },
        { new: true }
      )
      res.json({ success: true, response: rank, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
}

module.exports = ranksControllers
