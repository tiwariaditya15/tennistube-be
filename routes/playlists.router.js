const express = require("express");
const {
  getPlaylists,
  togglePlaylists,
  toggleLiked,
  addToHistory,
  toggleWatchLater,
  createPlaylist,
  removePlaylist,
  toggleDisliked,
} = require("../controllers/playlists.controller");

const router = express.Router();

router.route("/").get(getPlaylists);
router.route("/create").post(createPlaylist);
router.route("/remove").post(removePlaylist);
router.route("/toggle").post(togglePlaylists);
router.route("/watchlater").post(toggleWatchLater);
router.route("/liked").post(toggleLiked);
router.route("/disliked").post(toggleDisliked);
router.route("/history").post(addToHistory);

module.exports = router;
