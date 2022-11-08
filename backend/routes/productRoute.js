const express = require('express');
const router = express.Router();
var multer = require('multer');
const checkLogIn = require('../middleware/checkLogIn');
const isAdminCheck = require('../middleware/isAdminCheck');

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/uploads"); //important this is a direct path fron our current file to storage location
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "--" + file.originalname);
    },
  });
  
  
  // The Multer Middleware that is passed to routes that will receive income requests with file data (multipart/formdata)
  // You can create multiple middleware each with a different storage engine config so save different files in different locations on server
  const upload = multer({ storage: fileStorageEngine });

const {getArticles, imageUpload, createArticle, getArticle, updateArticle} = require('../controllers/articleController');


router.route('').get(getArticles);
router.route('/createArticle').post(createArticle);
router.route('/getArticle/:id').get(getArticle); // for admin
router.route('/imageUpload').post(upload.single('image'), imageUpload);
router.route('/updateArticle/:id').put(isAdminCheck, updateArticle);


module.exports = router;