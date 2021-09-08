const Video = require("../models/Video")
const User = require("../models/User")

const videosControllers = {
  getTopVideos: async (req, res) => {
    try {
      const videos = await Video.find().sort("-likes").limit(6)
      res.json({ success: true, response: videos, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  getUserVideos: async (req, res) => {
    try {
      const { username } = req.params
      const user = await User.findOne({ username })
      const videos = await Video.find({ owner: user._id })
      res.json({ success: true, response: videos, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  addVideo: async (req, res) => {
    try {
      const { owner, champion, title, hashtags, url } = req.body
      // Chequear que owner y champion sean mongo ids. owner lo sacamos de redux.
      const video = new Video({ owner, champion, title, hashtags, url })
      await video.save()
      res.json({ success: true, response: video, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  deleteVideo: async (req, res) => {
    try {
      const video = await Video.findOneAndDelete({ _id: req.params.id })
      res.json({ success: true, response: video, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  reportVideo: async (req, res) => {
    try {
      // sacar el id del author desde redux, y el comentario de un formulario.
      const { author, comment } = req.body
      const video = await Video.findOneAndUpdate(
        { _id: req.params.videoId },
        { $push: { reports: { author, comment } } },
        { new: true }
      )
      res.json({ success: true, response: video, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  updateVideo: async (req, res) => {
    // Cambiar title, hashtags y champion.
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
}

module.exports = videosControllers
