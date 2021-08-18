const { Notes } = require("../models/notes.model");

const getNotesByUserId = async (req, res, next) => {
  try {
    const { userId } = req;
    const [notes] = await Notes.find({ user: userId });
    if (notes) {
      req.notes = notes;
      return next();
    }
    return res.status(404).json({ message: "Notes doesn't exist." });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

module.exports = getNotesByUserId;
