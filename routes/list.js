const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/all", async (req, res) => {
  try {
    const list = await prisma.movie.findMany();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", getMovie, (req, res) => {
  res.json(res.movie);
});

router.post("/new", async (req, res) => {
  const { movieName, rating, cast, genre, releaseDate } = req.body;
  try {
    const newMovie = await prisma.movie.create({
      data: {
        movieName,
        rating,
        cast: cast.split(","),
        genre,
        releaseDate,
      },
    });
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/update/:id", getMovie, async (req, res) => {
  const { movieName, rating, cast, genre, releaseDate } = req.body;

  try {
    const updateMovie = await prisma.movie.update({
      where: { id: res.movie.id },
      data: {
        movieName: movieName || res.movie.movieName,
        rating: rating || res.movie.rating,
        cast: cast || res.movie.cast,
        genre: genre || res.movie.genre,
        releaseDate: releaseDate || res.movie.releaseDate,
      },
    });
    res.json(updateMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/delete/:id", getMovie, async (req, res) => {
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

module.exports = router;
