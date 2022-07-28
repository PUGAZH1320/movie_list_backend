const express = require('express')
const router = express.Router()
const Movie = require('../models/movie')



//

router.get('/',async (req, res) => {

    try{
        const list = await Movie.find()
        res.json(list)
    }catch (err) {
        res.status(500).json ({message:err.message})
    }
})

router.get('/:id',getMovie, (req, res) => {
    res.json(res.movie)
})

router.post('/',async (req, res) => {
    const movie = new Movie ({
        movieName: req.body.movieName,
        rating: req.body.rating,
        cast: req.body.cast,
         genre: req.body.genre,
        releaseDate: req.body.releaseDate
    })
    try {
        const newMovie = await movie.save()
        res.status(201).json(newMovie)
    }catch (err) {
        res.status(400).json({message: err.message })
    }
})
router.patch('/:id', getMovie, async (req, res) => {
    if (req.body.movieName != null){
        res.movie.movieName = req.body.movieName
    }
    if (req.body.rating != null){
        res.movie.rating = req.body.rating
    }
    if (req.body.cast != null){
        res.movie.cast = req.body.cast
    }
    if (req.body.genre != null){
        res.movie.genre = req.body.genre
    }
    if (req.body.releaseDate != null){
        res.movie.releaseDate = req.body.releaseDate
    }
    try {
        const updateMovie = await res.movie.save()
        res.json(updateMovie)
    }catch (err) {
         res.status(400).json({message:err.message})
    }
    

})
router.delete('/:id',getMovie,async (req, res) => {
    try {
        await res.movie.remove()
        res.json({message:'Deleted Successfully'})
    }catch (err) {
        res.status(500).json({message:err.message})
    }

})

async function getMovie(req,res, next){
    
let movie
try {
    movie = await Movie.findById(req.params.id)
    if (movie == null) {
        return res.status(404).json({message:'Cannot find movie'})
    }
} catch (err) {
    return res.status(500).json ({message:err.message})
}
res.movie = movie
next()
}

module.exports = router