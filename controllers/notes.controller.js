const { extend } = require("lodash");
const { Notes } = require("../models/notes.model");
const getNotes = async (req, res) => {
  try {
    const { notes } = req;
    const { videoId } = req.params;
    if (notes.notes.some(({ video, note }) => video.equals(videoId))) {
      const [note] = notes.notes.filter(({ video }) => video.equals(videoId));
      return res.status(200).json({ note });
    }
    res.status(404).json({ message: "This video doesn't have notes" });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};
const addNote = async (req, res) => {
  try {
    const { notes } = req;
    const { videoId, note } = req.body;
    if (notes.notes.some(({ video, note }) => video.equals(videoId))) {
      const [staleNote] = notes.notes.filter(({ video }) =>
        video.equals(videoId)
      );
      const updatedNote = extend(staleNote, {
        note: staleNote.note.concat(note),
      });
      await notes.save();
      return res.status(200).json({
        message: "Added note.",
        updatedNote,
      });
    }
    notes.notes.push({ video: videoId, note: [].concat(note) });
    await notes.save();
    return res.status(200).json({
      message: "Added note.",
      updatedNote: { video: videoId, note: [].concat(note) },
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

module.exports = {
  getNotes,
  addNote,
};
