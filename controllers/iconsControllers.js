const Icon = require("../models/Icon")

const iconsControllers = {
  getIcons: async (req, res) => {
    try {
      const icons = await Icon.find().sort("riotKey")
      res.json({ success: true, response: icons, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  getIconsByPageNumber: async (req, res) => {
    try {
      const page = parseInt(req.params.page)
      const icons = await Icon.find()
        .sort("riotKey")
        .skip((page - 1) * 10)
        .limit(10)
      res.json({ success: true, response: icons, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  getIconByKey: async (req, res) => {
    try {
      const icon = await Icon.findOne({ riotKey: req.params.key })
      res.json({ success: true, response: icon, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  addIcon: async (req, res) => {
    try {
      const { riotKey, image } = req.body
      const alreadyExists = await Icon.findOne({ riotKey })
      if (alreadyExists) throw new Error("Icon already exists")
      const newIcon = new Icon({ riotKey, image })
      const icon = await newIcon.save()
      res.json({ success: true, response: icon, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  deleteIcons: async (req, res) => {
    try {
      const icons = await Icon.deleteMany()
      res.json({ success: true, response: icons, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
}

module.exports = iconsControllers
