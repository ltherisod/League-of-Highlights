const mongoose = require("mongoose")

const videoSchema = new mongoose.Schema({
  owner: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  champion: { type: mongoose.Types.ObjectId, ref: "champion" },
  title: { type: String },
  hashtags: [{ type: String }],
  url: { type: String, required: true },
  comments: [
    {
      author: { type: mongoose.Types.ObjectId, ref: "user", required: true },
      content: { type: String, required: true },
    },
  ],
  reports: [
    {
      author: { type: mongoose.Types.ObjectId, ref: "user", required: true },
      content: { type: String, required: true },
    },
  ],
  likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
})

const Video = mongoose.model("video", videoSchema)

module.exports = Video
