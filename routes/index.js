const express = require('express');
const router  = express.Router();
const Movie = require('../models/movie-model.js')


// added to tie the cloudinary setup
const multer = require('multer');
const upload = multer({dest: './public//uploads/'})
const cloudinary = require('cloudinary');
const uploadCloud = require('../config/cloudinary.js');
// console.log("what is uploadCloud: ", uploadCloud)



/* GET home page */
router.get('/', (req, res, next) => {
  Movie.find()
  .then((movies) => {
    res.render('index', { movies });
  })
  .catch((error) => {
    console.log(error)
  })
});

router.get('/movie/add', (req, res, next) => {
  res.render('movie-add')
});

router.post('/movie/add', uploadCloud.single('photo'), (req, res, next) => {
    const newMovie = new Movie({
      title: req.body.title,
      description: req.body.description,
      imgPath: req.file.url,
      imgName: req.file.photo
    })
    // cloudinary.uploadCloud(req.file.path, function(result){
    //   console.log(result);
    //   const { title, description } = req.body;
    //   const imgPath = req.file.url;
    //   const imgName = req.file.photo;
    //   const newMovie = new Movie({title, description, imgPath, imgName})

    newMovie.save(function(err, photos){
      if(err){
        console.log("tha err is: ", err);
      }
      res.json({message: "Movie saved."});
      console.log("photos: ", photos)
    })
})

module.exports = router;