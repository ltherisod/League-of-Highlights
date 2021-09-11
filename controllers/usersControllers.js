const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const transport = require("../config/mail")
const jwt = require("jsonwebtoken")
const Icon = require("../models/Icon")
const Champion = require("../models/Champion")
const Rank = require("../models/Rank")
const BlackList = require("../models/BlackList")
const Video = require("../models/Video")

const usersControllers = {
  signUp: async (req, res) => {
    try {
      const { name, email, password, googleFlag } = req.body
      const userExists = await User.findOne({ email: email })
      const emailInBlackList = await BlackList.findOne({ email: email })
      if (emailInBlackList) {
        throw new Error("This email is in black list. Fucking idiot.")
      }
      if (userExists) throw new Error("Email already in use!")
      const hashedPass = await bcryptjs.hash(password, 10)
      const verifyCode = Math.random()
        .toString(36)
        .replace(/[^a-z0-9]+/g, "")
        .substr(1, 6)
        .toUpperCase()
      const newUser = new User({
        name: name.toLowerCase(),
        email: email.toLowerCase(),
        password: hashedPass,
        google: googleFlag,
        verifyCode,
      })

      // send mail
      transport.transport.sendMail(
        transport.options(
          email,
          "Confirm your new League of Highlights account",
          `<div>
              <h2>You're almost finished, ${name}!</h2>
              <p>To verify your account, please enter this verification code:</p>
              <p>${verifyCode}</p>
          </div>`
        ),
        (err, info) => {
          if (err) {
            console.log(err)
            return res.json({
              success: false,
              response: null,
              error: err.message,
            })
          }
          res.json({ success: true, response: info, error: null })
        }
      )
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
          guest: user.guest,
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
      const userInBlackList = await BlackList.findOne({ email })
      if (userInBlackList) throw new Error("Estás en la blacklist fermacanas.")
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
        response: { ...user, token },
        // {
        //   name: user.name,
        //   icon: user.icon,
        //   email: user.email,
        //   topChampions: user.topChampions,
        //   guest: user.guest,
        //   rank: user.rank,
        //   division: user.division,
        //   username: user.username,
        //   _id: user._id,
        //   token,
        //   admin: user.admin,
        // },
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
        .populate({
          path: "topChampions",
          populate: { path: "tags" },
        })
        .populate("rank")
      if (!user) throw new Error("User doesn't exist.")
      res.json({
        success: true,
        response: {
          icon: user.icon,
          topChampions: user.topChampions,
          guest: user.guest,
          rank: user.rank,
          division: user.division,
          user: user.username,
          username: user.username,
          _id: user._id,
          admin: user.admin,
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
          admin: user.admin,
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
      res.json({
        success: true,
        response: { username: user.username },
        error: null,
      })
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
  deleteUserById: async (req, res) => {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.id })
      await Video.deleteMany({ owner: req.params.id })
      await Video.updateMany(
        { "comments.author": req.params.id },
        { $pull: { comments: { author: req.params.id } } },
        { new: true }
      )
      await Video.updateMany(
        { "reports.author": req.params.id },
        { $pull: { reports: { author: req.params.id } } },
        { new: true }
      )
      await Video.updateMany(
        { likes: req.params.id },
        { $pull: { likes: req.params.id } },
        { new: true }
      )
      // const email = new BlackList({ email: user.email })
      // await email.save()
      res.json({ success: true, response: user, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  getBlackList: async (req, res) => {
    try {
      const blacklist = await BlackList.find()
      res.json({ success: true, response: blacklist, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  setAdmin: async (req, res) => {
    try {
      if (req.body.adminKey !== process.env.ADMIN_KEY)
        throw new Error("Unauthorized.")
      const admin = await User.findOneAndUpdate(
        { _id: req.params.id },
        { admin: req.body.admin },
        { new: true }
      )
      res.json({ success: true, response: admin, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  dismissUserReport: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { reports: [] } },
        { new: true }
      )
      res.json({ success: true, response: user, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  dismissVideoReport: async (req, res) => {
    try {
      const video = await Video.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { reports: [] } },
        { new: true }
      )
      res.json({ success: true, response: video, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  verifyCode: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id })
      if (user.verifyCode !== req.body.verifyCode)
        throw new Error("Invalid code.")
      await User.findOneAndUpdate(
        { _id: req.params.id },
        { verified: true },
        { new: true }
      )
      res.json({ success: true, response: user, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
}

module.exports = usersControllers
