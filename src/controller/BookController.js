const BookService = require('../service/book.service');

class BookController {
    bookService;

    constructor() {
        this.bookService = BookService;
    }
    async showListBook(req, res) {
        const books = await this.bookService.getBooks();        // render view + pasing data to view
        res.render('books/list.ejs', { data: books });
    }

    async deleteBook(req, res) {
        try {
            await this.bookService.deleteBookById(req, res);
        }catch(e) {
            console.error(e);
        }
        res.redirect('/admin/books');
    }
}

module.exports = new BookController();