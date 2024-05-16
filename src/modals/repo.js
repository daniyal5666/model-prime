import MysqlConnection from '../db/index.js';
const promisePool = MysqlConnection.connection();

export const saveModel = async (data) => {
    const [result] = await promisePool.execute('INSERT INTO modals (name, path, size, user_id,) VALUES (?, ?, ?, ?)', data);
    return result;
};

export const getUserModels = async (id) => {
    const [rows, _fields] = await promisePool.execute('SELECT * FROM modals WHERE user_id = ?', [id]);
    return rows;
};

export const deleteModal = async (ids) => {
    const [result] = await promisePool.execute('DELETE FROM modals WHERE id = ? AND user_id = ?', ids);
    return result;
};
