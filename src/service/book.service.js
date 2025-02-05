const fs = require('fs');

const BookModel = require('./../model/book.model')
const CategoryModel = require('./../model/category.model')

class BookService {
    bookModel;
    categoryModel;

    constructor() {
        this.bookModel = BookModel;
        this.categoryModel = CategoryModel;
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
        if(listCategory.length > 0) {
            listCategory.forEach(element => {
                this.bookModel.insertCategoryBook(idBookInsert, element)
            });
         }
    }

    async findBookById(idBook){
        return await this.bookModel.findBookById(idBook);
    }

    async getCategoryOfBook(idBook) {
        const list =  await this.bookModel.getCategoriesOfBookById(idBook);
        console.log(list);
        return list
    }

    async updateBook(req, res) {
        const {id} = req.params;
        const bookUpdate = await this.findBookById(id);
        const data = req.body;
        // xoa dc anh cu
        if(req.file) {
            const image = req.file;
            const nameFile = image.filename;
            data.image = nameFile;
            const pathImageBook = "public/images/" + bookUpdate.image;
            await this.unlinkFile(pathImageBook);
        }
        
        // thu hien update book
        await this.bookModel.updateBook(data, id)
        // thuc hien update categories
        // b1: Delete categories cu cua book theo book_id
        await this.categoryModel.deleteCategoryByBookId(id);
        // b2: Insert new category
        let listCategory = req.body.category;
        if( typeof listCategory == "string") {
            listCategory = [listCategory]
        }
        this.insertCategoryBook(id, listCategory);
    }

}

module.exports = new BookService();