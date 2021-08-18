const mongoose = require("mongoose");
const { Schema } = mongoose;

const Statistics = new Schema({
  views: Number,
  likes: Number,
  dislikes: Number,
});

const Channel = new Schema({
  name: String,
  logo: String,
});

const VideoSchema = new Schema({
  title: String,
  thumbnail: String,
  description: String,
  uploaded: String,
  url: String,
  statistics: Statistics,
  channel: Channel,
  tags: [String],
  category: [String],
});

const Video = mongoose.model("Video", VideoSchema);

module.exports = { Video };
