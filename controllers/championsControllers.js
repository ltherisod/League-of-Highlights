const Champion = require("../models/Champion")
const Role = require("../models/Role")

const rolesIds = {
  Tank: "6133c412dbc6ac4448d7be39",
  Assassin: "6133c402dbc6ac4448d7be37",
  Marksman: "6133c42bdbc6ac4448d7be3b",
  Support: "6133c44fdbc6ac4448d7be3d",
  Mage: "6133c469dbc6ac4448d7be41",
  Fighter: "6133c462dbc6ac4448d7be3f",
}

const championsControllers = {
  getChampions: async (req, res) => {
    try {
      const champions = await Champion.find().populate("tags")
      res.json({ success: true, response: champions, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  getChampionByName: async (req, res) => {
    try {
      const { name } = req.params
      const champion = await Champion.findOne({ name }).populate("tags")
      res.json({ success: true, response: champion, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  addChampion: async (req, res) => {
    try {
      const { name, title, riotKey, tags, image } = req.body
      const tagsIds = tags.map((tag) => rolesIds[tag])
      const alreadyExists = await Champion.findOne({ name })
      if (alreadyExists) throw new Error("already exists")
      const newChampion = new Champion({
        name,
        title,
        riotKey,
        tags: tagsIds,
        image,
      })
      const champion = await newChampion.save()
      res.json({ success: true, response: champion, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  updateChampionByName: async (req, res) => {
    try {
      const { name } = req.params
      const champion = await Champion.findOneAndUpdate(
        { name },
        { ...req.body },
        { new: true }
      )
      res.json({ success: true, response: champion, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  deleteChampionByName: async (req, res) => {
    try {
      const { name } = req.params
      const champion = await Champion.findOneAndDelete({ name })
      res.json({ success: true, response: champion, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  addRole: async (req, res) => {
    try {
      const { name, image } = req.body
      const newRole = new Role({
        name,
        image,
      })
      const role = await newRole.save()
      res.json({ success: true, response: role, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  getRoles: async (req, res) => {
    try {
      const roles = await Role.find()
      res.json({ success: true, response: roles, error: false })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  updateRoles: async (req, res) => {
    try {
      const role = await Role.findOneAndUpdate(
        { name: req.params.name },
        { ...req.body },
        { new: true }
      )
      res.json({ success: true, response: role, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
}

module.exports = championsControllers
