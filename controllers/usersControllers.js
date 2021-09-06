const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Icon = require("../models/Icon")
const Champion = require("../models/Champion")
const Rank = require("../models/Rank")

const usersControllers = {
  signUp: async (req, res) => {
    try {
      const { name, email, password } = req.body
      const hashedPass = await bcryptjs.hash(password, 10)
      const userExists = await User.findOne({ email: email })
      if (userExists) throw new Error("Email already in use!")
      const newUser = new User({
        name,
        email,
        password: hashedPass,
      })
      const user = await newUser.save()
      const token = jwt.sign(
        { _id: user._id, email: user.email },
        process.env.SECRETKEY
      )
      res.json({
        success: true,
        response: {
          name: user.name,
          email: user.email,
          _id: user._id,
          icon: user.icon,
          token,
        },
        error: null,
      })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  logIn: async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email: email })
        .populate({
          path: "topChampions",
          populate: { path: "tags" },
        })
        .populate("rank")
      if (!user) throw new Error("Email and/or password incorrect")
      const secretPassword = await bcryptjs.compare(password, user.password)
      if (!secretPassword) throw new Error("Email and/or password incorrect")
      const token = jwt.sign(
        { _id: user._id, email: user.email },
        process.env.SECRETKEY
      )
      return res.json({
        success: true,
        response: {
          name: user.name,
          icon: user.icon,
          email: user.email,
          topChampions: user.topChampions,
          guest: user.guest,
          rank: user.rank,
          division: user.division,
          username: user.username,
          _id: user._id,
          token,
        },
        error: null,
      })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  updateUser: async (req, res) => {
    try {
      const { username, division, rankName, iconKey, topChampionsKeys, guest } =
        req.body
      const id = req.params.id
      console.log(typeof topChampionsKeys[0])
      const icon = await Icon.findOne({ riotKey: iconKey })
      const rank = await Rank.findOne({ name: rankName })
      const topChampions = await Champion.find()
        .where("riotKey")
        .in(topChampionsKeys)
      const user = await User.findOneAndUpdate(
        { _id: id },
        {
          username,
          division,
          rank,
          icon: icon.image,
          topChampions: topChampions.map((champion) => champion._id),
          guest,
        },
        { new: true }
      )
        .populate({
          path: "topChampions",
          populate: { path: "tags" },
        })
        .populate("rank")
      res.json({ success: true, response: user, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  verifyToken: async (req, res) => {
    try {
      const id = req.user._id
      const user = await User.findOne({ _id: id })
        .populate({
          path: "topChampions",
          populate: { path: "tags" },
        })
        .populate("rank")
      const { icon, email, guest, _id, name } = user
      const token = jwt.sign({ _id, email }, process.env.SECRETKEY)
      if (!user.guest) {
        const { topChampions, rank, division, username } = user
        return res.json({
          success: true,
          response: {
            icon,
            email,
            guest,
            _id,
            name,
            topChampions,
            rank,
            division,
            username,
          },
          error: null,
        })
      }
      return res.json({
        success: true,
        response: { icon, guest, _id, email, token, name },
        error: null,
      })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
}

module.exports = usersControllers
