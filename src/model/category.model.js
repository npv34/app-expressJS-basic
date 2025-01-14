const DBConnect = require('./database');


class CategoryModel {
    connection;
    constructor() {
        this.connection = DBConnect.connect();
    }

    async getAllCategories() {
        const sql = 'SELECT * FROM categories';
        const [results] = await (await this.connection).query(sql);
        return results;
    }

    async deleteCategoryByBookId(idBook) {
        const sql = "DELETE FROM category_book WHERE id_book = ?"
        await (await this.connection).query(sql, [idBook]);
    }
}

module.exports = new CategoryModel();