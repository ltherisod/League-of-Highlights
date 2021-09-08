const Video = require("../models/Video")
const User = require("../models/User")
const Champion = require("../models/Champion")

const videosControllers = {
  getTopVideos: async (req, res) => {
    try {
      const videos = await Video.find()
        .sort("-likes")
        .limit(6)
        .populate({
          path: "owner",
          select: "username _id icon rank",
          populate: "rank",
        })
        .populate({ path: "champion", select: "image name" })
      res.json({ success: true, response: videos, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  getUserVideos: async (req, res) => {
    try {
      const { username } = req.params
      const user = await User.findOne({ username })
      const videos = await Video.find({ owner: user._id }).populate({
        path: "comments.author",
        select: "icon usernames",
      })
      const orderedVideos = videos.reverse().slice(0, 10)
      res.json({ success: true, response: orderedVideos, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  addVideo: async (req, res) => {
    try {
      const { owner, championName, title, hashtags, url } = req.body
      const champion = await Champion.findOne({ name: championName })
      // Chequear que owner y champion sean mongo ids. owner lo sacamos de redux.
      const video = new Video({
        owner,
        champion: champion._id,
        title,
        hashtags,
        url,
      })
      await video.save()
      res.json({ success: true, response: video, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  deleteVideo: async (req, res) => {
    try {
      const video = await Video.findOneAndDelete({ _id: req.params.videoId })
      if (req.user._id.toString() !== video.owner.toString())
        throw new Error("You are not allowed to delete this video.")
      res.json({ success: true, response: video, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  reportVideo: async (req, res) => {
    try {
      // sacar el id del author desde redux, y el comentario de un formulario.
      const { author, content } = req.body
      const video = await Video.findOneAndUpdate(
        { _id: req.params.videoId },
        { $addToSet: { reports: { author, content } } },
        { new: true }
      )
      res.json({ success: true, response: video, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  updateVideo: async (req, res) => {
    // Cambiar title, hashtags y champion.
    try {
      const { videoId } = req.params
      const { title, hashtags, championName } = req.body
      const champion = await Champion.findOne({ name: championName })
      const video = await Video.findOneAndUpdate(
        { _id: videoId },
        { title, hashtags, champion: champion._id },
        { new: true }
      ).populate({
        path: "comments.author",
        select: "icon usernames",
      })
      res.json({ success: true, response: video, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  toggleLike: async (req, res) => {
    try {
      const { userId } = req.body
      const { videoId } = req.params
      const oldVideo = await Video.findOne({ _id: videoId })
      if (oldVideo.likes.includes(userId)) {
        const video = await Video.findOneAndUpdate(
          { _id: videoId },
          { $pull: { likes: userId } },
          { new: true }
        )
        return res.json({ success: true, response: video, error: null })
      }
      const video = await Video.findOneAndUpdate(
        { _id: videoId },
        { $addToSet: { likes: userId } },
        { new: true }
      )
      res.json({ success: true, response: video, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  handleComment: async (req, res) => {
    try {
      switch (
        req.body.type // Pendiente
      ) {
      }
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
}

module.exports = videosControllers
