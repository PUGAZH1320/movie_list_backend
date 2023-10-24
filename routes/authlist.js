const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const prisma = new PrismaClient();

const jwtSecret = process.env.ACCESS_TOKEN_SECRET;

router.get("/all", authenticateToken, getMoviesByCreator, async (req, res) => {
  const creator = req.user.email;
  if (creator == process.env.ADMIN) {
    try {
      const list = await prisma.movie.findMany();
      res.json(list);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.json(res.movies);
  }
});

router.get("/:id", authenticateToken, getMovie, (req, res) => {
  res.json(res.movie);
});

router.post("/new", authenticateToken, async (req, res) => {
   const creator = req.user.email;
  const { movieName, rating, cast, genre, releaseDate } = req.body;
  try {
    const newMovie = await prisma.movie.create({
      data: {
        movieName,
        rating:parseFloat(rating),
        cast: cast.split(","),
        genre,
        releaseDate,
        createdBy:creator
      },
    });
    res.status(201).json({message:"Movie added successfully",newMovie});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/update/:id", authenticateToken, getMovie, async (req, res) => {
  const { movieName, rating, cast, genre, releaseDate } = req.body;
  const creator = req.user.email;
  if (cast){

    var castArray = cast.split(",").map((item) => item.trim());
  } 

  try {
    const updateMovie = await prisma.movie.update({
      where: { id: res.movie.id },
      data: {
        movieName: movieName || res.movie.movieName,
        rating: parseFloat(rating) || parseFloat(res.movie.rating),
        cast: cast && castArray || res.movie.cast,
        genre: genre || res.movie.genre,
        releaseDate: releaseDate || res.movie.releaseDate,
        createdBy : res.movie.createdBy 
      },
    });
  res.status(200).json({ message: "Updated Successfully", updateMovie });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/delete/:id", authenticateToken, getMovie, async (req, res) => {
  try {
    await prisma.movie.delete({
      where: { id: res.movie.id },
    });
    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getMovie(req, res, next) {
  let movie;
  try {
    movie = await prisma.movie.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!movie) {
      return res.status(404).json({ message: "Cannot find movie" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.movie = movie;
  next();
}

async function getMoviesByCreator(req, res, next) {
  const creator = req.user.email; 
  try {
    const movies = await prisma.movie.findMany({
      where: { createdBy: creator },
    });

    res.movies = movies;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}


function authenticateToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. Token not provided." });
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token." });
    }
    req.user = user;
    next();
  });
}

module.exports = router;
