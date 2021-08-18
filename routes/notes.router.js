const express = require("express");
const { getNotes, addNote } = require("../controllers/notes.controller");
const router = express.Router();

router.route("/:videoId").get(getNotes);
router.route("/").post(addNote);

module.exports = router;
