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
}

module.exports = new CategoryModel();