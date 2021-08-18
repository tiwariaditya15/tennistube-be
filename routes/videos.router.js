const express = require("express");
const { getVideos } = require("../controllers/videos.controller");

const router = express.Router();

router.get("/", getVideos);

module.exports = router;
