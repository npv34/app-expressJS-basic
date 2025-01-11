const DBConnect = require('./database');

class BookModel {
    connection;
    constructor() {
        this.connection = DBConnect.connect();
    }

    async getAllBooks() {
        const sql = `
        SELECT b.id_book, b.name as 'book_name', b.price, au.name as 'author_name'
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
}

module.exports = new BookModel();