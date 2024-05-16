import mysql from 'mysql2/promise';

let instance;

class MysqlConnectionClass {
    #sqlOption = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 3,
        queueLimit: 0,
    };

    #pool = null;

    connection() {
        if (!this.#pool) this.#pool = mysql.createPool(this.#sqlOption);
        return this.#pool;
    }

    constructor() {
        if (instance) throw new Error('You can only create one instance!');
        instance = this;
    }
}

const MysqlConnection = Object.freeze(new MysqlConnectionClass());
export default MysqlConnection;
