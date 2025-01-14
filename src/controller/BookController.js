const bookModel = require('../model/book.model');
const BookService = require('../service/book.service');
const CategoryService = require('../service/category.service');

class BookController {
    bookService;
    categoryService;

    constructor() {
        this.bookService = BookService;
        this.categoryService = CategoryService;
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

    async showFormCreate(req, res) {
        const publishers = await this.bookService.getPublishers();
        const authors = await this.bookService.getAuthor(); 
        const categories = await this.categoryService.getCategories();  
        res.render('books/create.ejs', { listPublisher: publishers, listAuthors: authors, categories: categories });
    }

    async storeBook(req, res) {
        await this.bookService.createBook(req)
        res.redirect('/admin/books');
    }

    async showFomrEditBook(req, res) {
        const publishers = await this.bookService.getPublishers();
        const authors = await this.bookService.getAuthor(); 
        const categories = await this.categoryService.getCategories();  
        const {id} = req.params;
        const bookUpdate = await this.bookService.findBookById(id)
        const listCategoryOfBook = await this.bookService.getCategoryOfBook(id);
        const listIdCategory = []
        listCategoryOfBook.forEach(item => {
                listIdCategory.push(item.id_cate)
        })
        res.render('books/edit.ejs', { listPublisher: publishers,
             listAuthors: authors, 
             categories: categories,
             bookUpdate: bookUpdate,
             listIdCategory: listIdCategory
             });
    }

    async editBook(req, res) {
       await this.bookService.updateBook(req, res);
       res.redirect('/admin/books');
    }
}

module.exports = new BookController();