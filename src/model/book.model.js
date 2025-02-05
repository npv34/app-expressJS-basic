const DBConnect = require('./database');

class BookModel {
    connection;
    constructor() {
        this.connection = DBConnect.connect();
    }

    async getAllBooks() {
        const sql = `
        SELECT b.id_book, b.name as 'book_name', b.price, b.image, au.name as 'author_name'
        FROM books b
        JOIN author au
        ON b.id_author = au.id_author`;
        const [results] = await (await this.connection).query(sql);
        return results;
    }

    async deleteBook(id) {
        const sql = 'DELETE FROM books WHERE id_book = ?';
        await (await this.connection).query(sql, [id]);
    }

    async getAllPublishers() {
        const sql = `SELECT * FROM publisher`;
        const [results] = await (await this.connection).query(sql);
        return results;
    }

    async getAllAuthor() {
        const sql = `SELECT * FROM author`;
        const [results] = await (await this.connection).query(sql);
        return results;
    }

    async insertBook(data) {
        const sql = `
            INSERT INTO books (name, id_publisher, id_author, price, image, publish_year, amount) 
            VALUES (?,?,?,?,?,?,?);
        `;
        const {name, id_publisher, id_author, price, image, publish_year, amount} = data
        return await (await this.connection).query(sql, [name, id_publisher, id_author, price, image, publish_year, amount]);
    }

    async insertCategoryBook(idBookInsert, idCategory) {
        const sql = 'INSERT INTO category_book (id_book, id_cate) VALUES (?,?)';
        await (await this.connection).query(sql, [idBookInsert, idCategory]);
    }

    async findBookById(idBook){
        const sql = 'SELECT * FROM books WHERE id_book =?';
        const [results] = await (await this.connection).query(sql, [idBook]);
        return results[0];
    }

    async getCategoriesOfBookById(idBook) {
        const sql = 'SELECT * FROM category_book WHERE id_book =?';
        const [results] = await (await this.connection).query(sql, [idBook]);
        return results;
    }

    async updateBook(data, idBook) {
        const sql = 'UPDATE books SET name = ?, id_publisher = ?, id_author = ?, price =? , image = ?, publish_year =?, amount = ? WHERE id_book = ?';
        const {name, id_publisher, id_author, price, image, publish_year, amount} = data
        return await (await this.connection).query(sql, [name, id_publisher, id_author, price, image, publish_year, amount, idBook]);
    }


}

module.exports = new BookModel();