const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Icon = require("../models/Icon")
const Champion = require("../models/Champion")
const Rank = require("../models/Rank")

const usersControllers = {
  signUp: async (req, res) => {
    try {
      const { name, email, password, googleFlag } = req.body
      const userExists = await User.findOne({ email: email })
      if (userExists) throw new Error("Email already in use!")
      const hashedPass = await bcryptjs.hash(password, 10)
      const newUser = new User({
        name: name.toLowerCase(),
        email: email.toLowerCase(),
        password: hashedPass,
        google: googleFlag,
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
          admin: user.admin,
        },
        error: null,
      })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  logIn: async (req, res) => {
    try {
      const { email, password, googleFlag } = req.body
      const user = await User.findOne({ email: email })
        .populate({
          path: "topChampions",
          populate: { path: "tags" },
        })
        .populate("rank")
      if (!user) throw new Error("Email and/or password incorrect")
      if (user.google && !googleFlag) {
        throw new Error("You  have a Google´s account, please log in there")
      }
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
          admin: user.admin,
        },
        error: null,
      })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id })
        .populate({
          path: "topChampions",
          populate: { path: "tags" },
        })
        .populate("rank")
      if (!user) throw new Error("User doesn't exist")
      const { icon, topChampions, guest, rank, division, username, _id } = user
      // res.json({
      //   success: true,
      //   response: { username, _id, icon, guest, rank, division, topChampions },
      //   error: null,
      // })
      res.json({ success: true, response: user, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  getUserByUsername: async (req, res) => {
    try {
      const { username } = req.params
      const user = await User.findOne({ username })
      if (!user) throw new Error("User doesn't exist.")
      res.json({
        success: true,
        response: {
          icon: user.icon,
          topChampions: user.topChampions,
          guest: user.guest,
          rank: user.rank,
          division: user.division,
          username: user.username,
          _id: user._id,
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
      const icon = await Icon.findOne({ riotKey: iconKey })
      const rank = await Rank.findOne({ name: rankName })
      const topChampions = await Champion.find()
        .where("riotKey")
        .in(topChampionsKeys)
      const userExists = await User.findOne({ _id: id }) // Tiene el username 'antiguo'
      if (!userExists) throw new Error("This user doesn't exists.")
      const usernameExists = await User.findOne({
        username,
      })
      if (
        usernameExists &&
        usernameExists._id.toString() !== userExists._id.toString()
      ) {
        throw new Error("Username in use.")
      }
      const user = await User.findOneAndUpdate(
        { _id: id },
        {
          username,
          division,
          rank,
          icon: icon?.image,
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
      res.json({
        success: true,
        response: {
          user: user.username,
          _id: user._id,
          icon: user.icon,
          guest: user.guest,
          rank: user.rank,
          division: user.division,
          topChampions: user.topChampions,
        },
        error: null,
      })
    } catch (e) {
      res.json({ success: false, response: {}, error: e.message })
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
      const { icon, email, guest, _id, name, admin } = user
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
            admin,
          },
          error: null,
        })
      }
      return res.json({
        success: true,
        response: { icon, guest, _id, email, name, admin },
        error: null,
      })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  deleteUserByUsername: async (req, res) => {
    try {
      const user = await User.findOneAndDelete({
        username: req.params.username,
      })
      res.json({ success: true, response: user, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  getReportedUsers: async (req, res) => {
    try {
      const users = await User.find().where("reports.count").gte(1)
      res.json({ success: true, response: users, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  reportUser: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { reports: { user: req.user._id, content: req.body.content } },
        },
        { new: true }
      )
      res.json({ success: true, response: user, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  // deleteUsers: async (req, res) => {
  //   try {
  //     await User.deleteMany()
  //     res.json({ success: true, response: "Usuarios eliminados", error: null })
  //   } catch (e) {
  //     res.json({ success: false, response: null, error: e.message })
  //   }
  // },
}

module.exports = usersControllers
