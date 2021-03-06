const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const User = require("../models/User");

const jwtSign = require("../utils/jwtSign");

exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // See if user exists
    let user = await User.findOne({
      email,
      where: {
        email,
      },
      attributes: ["id"],
    });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    user = new User({
      name,
      email,
      password,
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Return JWT
    const token = jwtSign(user);
    res.json({ token });
  } catch (err) {
    console.log("registerUser:", err.message);
    res.status(500).json({ message: err });
  }
};

// get user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      attributes: ["id", "name", "email", "password", "avatar", "about"],
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      return res.status(400).json({ msg: "There is no user" });
    }

    return res.json(user);
  } catch (err) {
    console.log("getUser:", err.message);
    res.status(500).json({ message: err });
  }
};

// update user
exports.updateUser = async (req, res) => {
  if (req.file) {
    req.body.avatar = `/images/uploads/${req.file.filename}`;
  }

  try {
    let user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });
    if (user) {
      await User.update(
        { about: req.body.about, avatar: req.body.avatar },
        { where: { id: req.user.id } }
      );
      const user = await User.findOne({
        where: { id: req.user.id },
      });
      return res.json(user);
    } else {
      user = new User({
        id: req.user.id,
        about: req.body.about,
        avatar: req.body.avatar,
      });
      await user.save();
    }

    return res.json(user);
  } catch (err) {
    console.log("updateUser:", err.message);
    res.status(500).json({ message: err });
  }
};
