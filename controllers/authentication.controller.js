const { User } = require("../models/user.model");
const { Playlists } = require("../models/playlists.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Notes } = require("../models/notes.model");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [user] = await User.find({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User doesn't exist with given email." });
    }
    const validate = await bcrypt.compare(password, user.password);
    if (validate) {
      const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
        expiresIn: "24h",
      });
      return res.status(200).json({ token });
    }
    return res.status(401).json({ message: "Wrong Password!" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const signUp = async (req, res) => {
  try {
    const { password } = req.body;
    const user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    const newUser = await user.save();
    const playlists = new Playlists();
    const notes = new Notes();
    playlists.user = newUser._id;
    notes.user = newUser._id;
    await playlists.save();
    await notes.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET, {
      expiresIn: "24h",
    });
    return res.status(201).json({ token, fullname: newUser.fullname });
  } catch (err) {
    if (err.code === 11000) {
      return res.json({ status: 409, error: Object.keys(err.keyValue) });
    }
    if (err) {
      const errors = Object.keys(err.errors).map((error) => {
        return err.errors[error].properties.message;
      });
      return res.json({ status: 400, errors });
    }
    // todo: recheck this condition, not sure when would this reach
    return res.json({ status: 500, error: "Internal Error" });
  }
};

module.exports = { login, signUp };
