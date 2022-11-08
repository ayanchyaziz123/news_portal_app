const express = require('express');
const router = express.Router();
var multer = require('multer');
const isAdminCheck = require('../middleware/isAdminCheck');


const {getFilterCategories, updateCategory, deleteCategory, getCategory, getAllCategories, createCategory} = require('../controllers/categoryController');

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



router.route('/createCategory').post(upload.single('image') ,createCategory);
router.route('/getAllCategories').get(isAdminCheck ,getAllCategories);
router.route('/getCategory/:id').get(isAdminCheck, getCategory);
router.route('/deleteCategory/:id').delete(isAdminCheck, deleteCategory);
router.route('/updateCategory/:id').put(upload.single('image'), updateCategory);
router.route('/getFilterCategories/:id/data').get(getFilterCategories);





module.exports = router;