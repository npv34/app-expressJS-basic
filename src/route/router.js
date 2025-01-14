const express = require('express');
const multer  = require('multer')
const HomeController = require('../controller/HomeController');
const AuthController = require('../controller/AuthController');
const BookController = require('../controller/BookController');
const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
          cb(null, true);
        } else {
          cb(new Error('Invalid file type'));
        }
      },
 });

router.get('/home', (req, res) => {
    HomeController.showHomePage(req, res);
});

router.get('/login', (req, res) => {
    AuthController.showFormLogin(req, res);
});

router.post('/login', (req, res) => {
    AuthController.login(req, res);
});

router.get('/admin/books', (req, res) => {
    BookController.showListBook(req, res);
});

router.get('/admin/books/:id/delete', (req, res) => {
    BookController.deleteBook(req, res);
});

router.get('/admin/books/create', (req, res) => {
    BookController.showFormCreate(req, res);
})

router.post('/admin/books/store', upload.single('image'), (req, res) => {
    BookController.storeBook(req, res);
});

router.get('/admin/books/:id/edit', (req, res) => {
    BookController.showFomrEditBook(req, res);
});

router.post('/admin/books/:id/edit',upload.single('image'), (req, res) => {
    BookController.editBook(req, res);
});
module.exports = router;