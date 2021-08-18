const { extend } = require("lodash");

const incrementLikes = async (req, res) => {
  const { video } = req;
  const { videoId } = req.body;
  try {
    extend(video, {
      statistics: {
        views: video.statistics.views,
        likes: video.statistics.likes + 1,
        dislikes: video.statistics.dislikes,
      },
    });
    await video.save();
    return res.status(200).json({ videoId, message: "Likes Incremented." });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
};

const decrementLikes = async (req, res) => {
  const { video } = req;
  const { videoId } = req.body;
  try {
    extend(video, {
      statistics: {
        views: video.statistics.views,
        likes: video.statistics.likes - 1,
        dislikes: video.statistics.dislikes,
      },
    });
    await video.save();
    return res.status(200).json({ videoId, message: "Likes Decremented." });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
};

const incrementDislikes = async (req, res) => {
  const { video } = req;
  const { videoId } = req.body;
  try {
    extend(video, {
      statistics: {
        views: video.statistics.views,
        likes: video.statistics.likes,
        dislikes: video.statistics.dislikes + 1,
      },
    });
    await video.save();
    return res.status(200).json({ videoId, message: "Disikes Incremented." });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
};

const decrementDislikes = async (req, res) => {
  const { video } = req;
  const { videoId } = req.body;
  try {
    extend(video, {
      statistics: {
        views: video.statistics.views,
        likes: video.statistics.likes,
        dislikes: video.statistics.dislikes - 1,
      },
    });
    await video.save();
    return res.status(200).json({ videoId, message: "Disikes Decremented." });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
};

module.exports = {
  incrementLikes,
  decrementLikes,
  incrementDislikes,
  decrementDislikes,
};
