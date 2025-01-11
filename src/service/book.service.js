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

    async getPublishers() {
        return await this.bookModel.getAllPublishers();
    }

    async getAuthor() {
        return await this.bookModel.getAllAuthor();
    }

    async createBook(req) {
        try {
            const data = req.body;
            const [ResultSetHeader] = await this.bookModel.insertBook(data)
            const idBookInsert = ResultSetHeader.insertId;
            const listCategory = req.body.category;
            this.insertCategoryBook(idBookInsert, listCategory); 
        }catch(err) {
            
        }
       
    }

    async insertCategoryBook(idBookInsert, listCategory) {
        listCategory.forEach(element => {
            this.bookModel.insertCategoryBook(idBookInsert, element)
        });
    }

}

module.exports = new BookService();