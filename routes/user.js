const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


router.post("/register", async (req, res) => {
  const { email, pass } = req.body;
  const password = await bcrypt.hash(pass, 10);
  try {
    if (!email || !pass) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const newUser = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    if (!email || !pass) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(pass, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const accesstoken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.status(200).json({ message: "Login successful", accesstoken });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
