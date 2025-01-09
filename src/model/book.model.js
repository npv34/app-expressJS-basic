const DBConnect = require('./database');

class BookModel {
    connection;
    constructor() {
        this.connection = DBConnect.connect();
    }

    async getAllBooks() {
        const sql = 'SELECT * FROM books';
        const [results] = await (await this.connection).query(sql);
        return results;
    }

    async deleteBook(id) {
        const sql = 'DELETE FROM books WHERE id_book = ?';
        await (await this.connection).query(sql, [id]);
    }
}

module.exports = new BookModel();