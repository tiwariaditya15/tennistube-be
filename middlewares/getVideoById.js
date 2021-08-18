const { Video } = require("../models/video.model");

const getVideoById = async (req, res, next) => {
  const { videoId } = req.body;
  try {
    const video = await Video.findById({ _id: videoId });
    req.video = video;
    return next();
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
  next();
};

module.exports = getVideoById;
