const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');


console.log("name: ", process.env.CLOUDINARY_NAME)

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
console.log("blah")
var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'folder-name',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, 'my-file-name');
    console.log("inside");
  }
});

const uploadCloud = multer({ storage: storage });
// const uploadCloud = multer({ storage: storage }).single('photo');

module.exports = uploadCloud;