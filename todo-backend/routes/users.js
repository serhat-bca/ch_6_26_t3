const bcrypt = require("bcrypt");
const router = require("express").Router();
const { User, Todo } = require("../models");

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

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["passwordHash"] },
      include: {
        model: Todo,
        attributes: ["id", "task", "done"],
      },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["passwordHash"] },
      include: {
        model: Todo,
        attributes: ["id", "task", "done"],
      },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
