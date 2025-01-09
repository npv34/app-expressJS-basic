const BookModel = require('./../model/book.model')

class BookService {
    bookModel;

    constructor() {
        this.bookModel = BookModel;
    }
    
    async getBooks() {
        return await this.bookModel.getAllBooks();
    }

    async deleteBookById(req, res) {
        const id = req.params.id;
        await this.bookModel.deleteBook(id);
    }
}

module.exports = new BookService();