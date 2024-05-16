import { insertQueryBuilder } from '../utils/common.js';
import MysqlConnection from '../db/index.js';

const promisePool = MysqlConnection.connection();

export const getVerifiedUsers = async () => {
    const [rows, _fields] = await promisePool.execute('SELECT * FROM users WHERE user_type = "user" AND is_verified = 1');
    return rows;
};

export const getProducts = async () => {
    const query = `SELECT products.*, JSON_ARRAY(GROUP_CONCAT(options.name)) as nn
    FROM products
    INNER JOIN product_options
    ON product_options.product_id = products.id
    LEFT JOIN options
    ON options.id = product_options.option_id
    WHERE NOT products.deleted = 1
    GROUP BY product_options.product_id;`;

    const [rows, _fields] = await promisePool.execute(query);
    return rows;
};

export const saveProduct = async (data) => {
    const connection = promisePool.getCOnnection();
    await connection.beginTransaction();

    const productData = { ...data };
    delete productData.options;

    const { product_query, values } = insertQueryBuilder('products', productData);

    try {
        const [result] = await promisePool.execute(product_query, values);

        const product = result.insertId;

        const product_options_query =
            'INSERT INTO product_options (product_id, option_id) VALUES ' + data.options.map(() => `(${product}, ?)`);

        await promisePool.execute(product_options_query, data.options);

        await connection.commit();
        connection.release();

        return { status: true, id: product };
    } catch (error) {
        connection.rollback();
        connection.release();

        return { status: false, error };
    }
};

export const deleteSingleProduct = async (id) => {
    const [result] = await promisePool.execute('UPDATE products SET deleted = 1 WHERE id = ?', [id]);
    return result;
};

export const deletedMultipleProducts = async (ids) => {
    const query = 'UPDATE products SET deleted = 1 WHERE id IN (' + ids.map(() => '?') + ')';
    const [result] = await promisePool.execute(query, ids);
    return result;
};
