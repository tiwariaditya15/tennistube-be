const { extend } = require("lodash");

const getPlaylists = async (req, res) => {
  try {
    const { playlists } = req;
    const exclude = ["_id", "__v", "user", "customPlaylists"];

    const defaultPlaylists = Object.keys(playlists._doc).reduce((acc, key) => {
      return exclude.includes(key)
        ? { ...acc }
        : { ...acc, [key]: playlists[key] };
    }, {});

    const userPlaylists = playlists.customPlaylists.reduce(
      (acc, current) => {
        return { ...acc, [current.name]: current.videos };
      },
      { ...defaultPlaylists }
    );

    return res.status(200).json({ playlists: { ...userPlaylists } });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
};

const toggleWatchLater = async (req, res) => {
  const { videoId } = req.body;
  const { playlists } = req;
  try {
    if (playlists.watchLater.some((video) => video.equals(videoId))) {
      playlists.watchLater = playlists.watchLater.filter(
        (video) => !video.equals(videoId)
      );
      await playlists.save();
      return res.status(200).json({ message: "Removed from Watch Later" });
    }
    playlists.watchLater.push(videoId);
    await playlists.save();
    return res.status(200).json({ message: "Added to Watch Later" });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
};

const createPlaylist = async (req, res) => {
  const { playlist } = req.body;
  const { playlists } = req;
  try {
    playlists.customPlaylists.push({ name: playlist });
    await playlists.save();
    return res.status(200).json({ message: "Playlist created", playlist });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
};

const removePlaylist = async (req, res) => {
  const { playlist } = req.body;
  const { playlists } = req;
  try {
    const customPlaylists = playlists["customPlaylists"].filter(
      ({ name }) => name !== playlist
    );
    extend(playlists, { customPlaylists });
    playlists.save();
    return res.status(200).json({ message: "Playlist removed.", playlist });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};
const togglePlaylists = async (req, res) => {
  const { videoId, playlist } = req.body;
  const { playlists } = req;
  try {
    // watch later || liked/dislike
    if (playlists[playlist]) {
      if (playlists[playlist].some((video) => video.equals(videoId))) {
        playlists[playlist] = playlists[playlist].filter(
          (video) => !video.equals(videoId)
        );
        await playlists.save();
        return res.status(200).json({ message: "Removed" });
      }
      playlists[playlist].push(videoId);
      await playlists.save();
      return res.status(200).json({ message: "Added" });
    }

    // user defined playlists
    let updatePlaylist = playlists.customPlaylists.find(
      ({ name }) => name === playlist
    );
    if (updatePlaylist) {
      if (updatePlaylist.videos.some((video) => video.equals(videoId))) {
        const updatedPlaylist = updatePlaylist.videos.filter(
          (video) => !video.equals(videoId)
        );
        extend(updatePlaylist, { videos: updatedPlaylist });
        await playlists.save();
        return res.status(200).json({ message: "Removed" });
      }
      updatePlaylist.videos.push(videoId);
      await playlists.save();
      return res.status(200).json({ message: "Added" });
    }
    return res.status(404).json({ message: "Playlist doesn't exist." });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
};

const toggleLiked = async (req, res) => {
  const { videoId } = req.body;
  const { playlists } = req;
  try {
    if (playlists.liked.some((video) => video.equals(videoId))) {
      playlists.liked = playlists.liked.filter(
        (video) => !video.equals(videoId)
      );
      await playlists.save();
      return res.status(200).json({ message: "Removed from liked." });
    }
    playlists.liked.push(videoId);
    await playlists.save();
    return res.status(200).json({ message: "Added to liked." });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
};

const toggleDisliked = async (req, res) => {
  const { videoId } = req.body;
  const { playlists } = req;
  try {
    if (playlists.disliked.some((video) => video.equals(videoId))) {
      playlists.disliked = playlists.disliked.filter(
        (video) => !video.equals(videoId)
      );
      await playlists.save();
      return res.status(200).json({ message: "Removed from disliked." });
    }
    playlists.disliked.push(videoId);
    await playlists.save();
    return res.status(200).json({ message: "Added to disliked." });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
};

const addToHistory = async (req, res) => {
  const { videoId } = req.body;
  const { playlists } = req;
  try {
    if (!playlists.history.some((video) => video.equals(videoId))) {
      playlists.history.push(videoId);
      await playlists.save();
      return res.status(200).json({ message: "Added to history." });
    }
    const updatedHistory = playlists.history.filter(
      (video) => !video.equals(videoId)
    );
    updatedHistory.push(videoId);
    extend(playlists, { history: updatedHistory });
    await playlists.save();
    return res.status(200).json({ message: "Added to history." });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
};

module.exports = {
  getPlaylists,
  createPlaylist,
  removePlaylist,
  toggleWatchLater,
  togglePlaylists,
  toggleLiked,
  addToHistory,
  toggleDisliked,
};
