const BookModel = require('./../model/book.model')
const fs = require('fs');
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
        await this.deleteImageOfBook(id);
        await this.bookModel.deleteBook(id);
    }

    async deleteImageOfBook(idBook) {
        const book = await this.bookModel.findBookById(idBook);
        const imagePath = "./public/images/" + book.image;
        await this.unlinkFile(imagePath);
    }

    unlinkFile(filePath) {
         const promise = new Promise((resolve, reject) => {
             fs.unlink(filePath, (err) => {
                 if (err) {
                     reject(err);
                 } else {
                     resolve();
                 }
             });
         });
         return promise;
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
            const image = req.file;
            const nameFile = image.filename;
            data.image = nameFile
            const [ResultSetHeader] = await this.bookModel.insertBook(data)
            const idBookInsert = ResultSetHeader.insertId;
            const listCategory = req.body.category;
            this.insertCategoryBook(idBookInsert, listCategory); 
        }catch(err) {
            console.log(err.message);
        }
       
    }

    async insertCategoryBook(idBookInsert, listCategory) {
        listCategory.forEach(element => {
            this.bookModel.insertCategoryBook(idBookInsert, element)
        });
    }

}

module.exports = new BookService();