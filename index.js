require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { connectToAtlas } = require("./db/db.connect");
const videoRouter = require("./routes/videos.router");
const playlistsRouter = require("./routes/playlists.router");
const authenticationRouter = require("./routes/authentication.router");
const notesRouter = require("./routes/notes.router");
const verifyToken = require("./middlewares/verifyToken.middleware");
const routeNotFound = require("./middlewares/routeNotFound");
const defaultErrorHandler = require("./middlewares/defaultErrorHandler");
const getPlaylistsByUserId = require("./middlewares/getPlaylistsByUserId");
const getVideoById = require("./middlewares/getVideoById");
const statisticsRouter = require("./routes/statistics.router");
const getNotesByUserId = require("./middlewares/getNotesByUserId");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/videos", videoRouter);
app.use("/accounts", authenticationRouter);
app.use(verifyToken);
app.use("/playlists", getPlaylistsByUserId, playlistsRouter);
app.use("/statistics", getVideoById, statisticsRouter);
app.use("/notes", getNotesByUserId, notesRouter);

app.use(routeNotFound);
app.use(defaultErrorHandler);

mongoose.set("useCreateIndex", true);
async function connect() {
  try {
    await mongoose.connect(process.env.CONNECTION_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected to atlas.");
  } catch (error) {
    console.log(error);
  }
}
app.listen(process.env.PORT || 5000, () => console.log("Server up on 5000."));
connect();
console.log("index.js");
