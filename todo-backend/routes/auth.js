const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const { User } = require("../models");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) return res.status(401).json({ message: "Invalid Credentials" });

    const check = await bcrypt.compare(password, user.passwordHash);

    if (!check) return res.status(401).json({ message: "Invalid Credentials" });

    const payload = { username: user.username, id: user.id };

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });
    res.json({
      message: "Login Successfull",
      username: user.username,
      name: user.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/protected", authenticateToken, (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  res.status(201).json({ message: "Authorized", user: req.user });
});

module.exports = router;
