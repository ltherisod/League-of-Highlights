const Video = require("../models/Video")
const User = require("../models/User")
const Champion = require("../models/Champion")

const videosControllers = {
  getTopVideos: async (req, res) => {
    try {
      const videos = await Video.find()
        .populate({
          path: "owner",
          select: "username _id icon rank",
          populate: "rank",
        })
        .populate({ path: "champion", select: "image name" })
      const topVideos = videos
        .sort((a, b) => b.likes.length - a.likes.length)
        .slice(0, 6)
      res.json({ success: true, response: topVideos, error: null })
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
        select: "icon username",
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
      const video = await Video.findOne({ _id: req.params.videoId })
      if (
        !(req.user.admin || req.user._id.toString() === video.owner.toString())
      ) {
        throw new Error("You are not allowed to delete this video.")
      }
      const deletedVideo = await Video.findOneAndDelete({
        _id: req.params.videoId,
      })

      res.json({ success: true, response: deletedVideo, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  reportVideo: async (req, res) => {
    try {
      // sacar el id del author desde redux, y el comentario de un formulario.
      const { author, content } = req.body
      const alreadyReported = await Video.findOne({ _id: req.params.videoId })
      if (
        alreadyReported.reports.some(
          (report) => report.author.toString() === author
        )
      ) {
        throw new Error("You have already reported this video.")
      }
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

  manageComment: async (req, res) => {
    switch (req.body.type) {
      case "createComment":
        try {
          if (!req.body.content)
            throw new Error("You can't send an empty comment")
          const newComment = await Video.findOneAndUpdate(
            { _id: req.params.id },
            {
              $push: {
                comments: { author: req.user._id, content: req.body.content },
              },
            },
            { new: true }
          ).populate({
            path: "comments.author",
            select: "icon username",
          })
          if (!newComment) throw new Error("Error posting this comment.")
          res.json({ success: true, response: newComment, error: null })
        } catch (e) {
          res.json({ success: false, response: null, error: e.message })
        }
        break

      case "updateComments":
        try {
          if (!req.body.content)
            throw new Error("You can't send an empty comment")
          const updateComment = await Video.findOneAndUpdate(
            { "comments._id": req.params.id },
            { $set: { "comments.$.content": req.body.content } },
            { new: true }
          ).populate({
            path: "comments.author",
            select: "icon username",
          })
          if (!updateComment) throw new Error("Error updating this comment.")
          res.json({ success: true, response: updateComment, error: null })
        } catch (e) {
          res.json({ success: false, response: null, error: e.message })
        }
        break

      case "deleteComment":
        try {
          const video = await Video.findOne({
            "comments._id": req.body.commentId,
          })
          const comment = video.comments.find(
            (c) => c._id.toString() === req.body.commentId
          )
          if (comment?.author.toString() !== req.user._id.toString())
            throw new Error("Unauthorized, bitch.")
          const deleteComment = await Video.findOneAndUpdate(
            { "comments._id": req.body.commentId },
            { $pull: { comments: { _id: req.body.commentId } } },
            { new: true }
          ).populate({
            path: "comments.author",
            select: "icon username",
          })
          if (!deleteComment) throw new Error("Error deleting this comment.")
          res.json({ success: true, response: deleteComment, error: null })
        } catch (e) {
          res.json({ success: false, response: null, error: e.message })
        }
        break
      default:
        res.json({
          success: false,
          response: null,
          error:
            "Error with the type. Do you spell it correctly? The options are createComment, updateComment and deleteComment",
        })
    }
  },
  getReportedVideos: async (req, res) => {
    try {
      const reportedVideos = await Video.find()
        .where("reports.count")
        .gte(1)
        .populate({ path: "owner", select: "username" })
      res.json({ success: true, response: reportedVideos, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
}

module.exports = videosControllers
