const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlaylistsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  watchLater: [{ type: Schema.Types.ObjectId, ref: "Video" }],
  history: [{ type: Schema.Types.ObjectId, ref: "Video" }],
  liked: [{ type: Schema.Types.ObjectId, ref: "Video" }],
  disliked: [{ type: Schema.Types.ObjectId, ref: "Video" }],
  customPlaylists: [
    {
      name: { type: String, minLength: 1 },
      videos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
    },
  ],
});

const Playlists = mongoose.model("Playlist", PlaylistsSchema);

module.exports = { Playlists };
