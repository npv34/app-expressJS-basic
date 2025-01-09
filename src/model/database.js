const mysql = require('mysql2/promise');

class DBConnect {
    host;
    port;
    user;
    database;
    password;

    constructor() {
        this.host = "localhost";
        this.port = 3306;
        this.user = "root";
        this.database = "quanlysach";
        this.password = "123456@Abc";
    }

    async connect() {
        let conn = null;
        try {
            conn = await mysql.createConnection({
                host: this.host,
                user: this.user,
                database: this.database,
                port: this.port,
                password: this.password
            });
            console.log("Connected to database successfully");
        } catch (e) { 
            console.error(e);
            throw new Error("Can't connect to database");
        }
        return conn;
    }
}

module.exports = new DBConnect();