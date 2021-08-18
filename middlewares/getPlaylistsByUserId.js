const { Playlists } = require("../models/playlists.model");

const getPlaylistsByUserId = async (req, res, next) => {
  try {
    const { userId } = req;
    const [playlists] = await Playlists.find({ user: userId });
    if (playlists) {
      req.playlists = playlists;
      return next();
    }
    return res.status(404).json({ message: "Playlists not found!" });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
};

module.exports = getPlaylistsByUserId;
