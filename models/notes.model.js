const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  notes: [
    {
      video: { type: Schema.Types.ObjectId, ref: "Video" },
      note: [String],
    },
  ],
});

const Notes = mongoose.model("Note", NotesSchema);

module.exports = { Notes };
