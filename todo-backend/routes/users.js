const bcrypt = require("bcrypt");
const router = require("express").Router();
const { User } = require("../models");

router.post("/", async (req, res, next) => {
  try {
    const { username, name, password } = req.body;
    if (typeof password !== "string" || password.length < 8) {
      return res.status(400).json({
        error: "Password must be at least 8 characters",
      });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, name, passwordHash });
    res.status(201).json({
      id: user.id,
      username: user.username,
      name: user.name,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
