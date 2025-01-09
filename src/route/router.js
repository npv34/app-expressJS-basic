const express = require('express');
const HomeController = require('../controller/HomeController');
const AuthController = require('../controller/AuthController');
const BookController = require('../controller/BookController');
const router = express.Router();
router.get('/home', (req, res) => {
    HomeController.showHomePage(req, res);
})

router.get('/login', (req, res) => {
    AuthController.showFormLogin(req, res);
})

router.post('/login', (req, res) => {
    AuthController.login(req, res);
});

router.get('/admin/books', (req, res) => {
    BookController.showListBook(req, res);
})

router.get('/admin/books/:id/delete', (req, res) => {
    BookController.deleteBook(req, res);
});

module.exports = router;