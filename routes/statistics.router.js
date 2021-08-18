const express = require("express");
const {
  incrementLikes,
  decrementLikes,
  incrementDislikes,
  decrementDislikes,
} = require("../controllers/statistics.controller");

const router = express.Router();

router.route("/like/add").post(incrementLikes);
router.route("/like/remove").post(decrementLikes);
router.route("/dislike/add").post(incrementDislikes);
router.route("/dislike/remove").post(decrementDislikes);

module.exports = router;
