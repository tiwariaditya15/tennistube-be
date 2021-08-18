const { Video } = require("../models/video.model");

const getVideos = async (req, res) => {
  const videos = await Video.find({});
  res.status(200).json({ videos });
};

module.exports = { getVideos };
