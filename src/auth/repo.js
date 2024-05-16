import { insertQueryBuilder, updateQueryBuilder } from '../utils/common.js';
import MysqlConnection from '../db/index.js';

const promisePool = MysqlConnection.connection();

export const getUserByEmail = async (email) => {
    const [rows, _fields] = await promisePool.execute('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
    return rows[0];
};

export const signup = async (data) => {
    const { query, values } = insertQueryBuilder('users', data);
    const [result] = await promisePool.execute(query, values);
    return result;
};

export const saveNewPasswordAndInitialSetting = async (id, email, hash) => {
    const connection = await promisePool.getConnection();
    await connection.beginTransaction();
    try {
        await connection.execute('UPDATE users SET is_verified = 1, users.password = ? WHERE id= ? AND email = ?', [hash, id, email]);
        await connection.execute('DELETE FROM settings WHERE user_id = ?', [id]);
        await connection.execute('INSERT INTO settings (user_id) VALUES (?)', [id]);

        await connection.commit();
        connection.release();

        return { status: true };
    } catch (error) {
        connection.rollback();
        connection.release();

        return { status: false, error };
    }
};

export const saveOtp = async (data) => {
    const [result] = await promisePool.execute('UPDATE users SET otp_code = ? WHERE email = ?', data);
    return result;
};

export const resetPassword = async (data) => {
    const query = 'UPDATE users SET users.password = ?, otp_code = NULL WHERE email = ?';
    const [result] = await promisePool.execute(query, data);
    return result;
};

export const updateProfile = async (data, id) => {
    // const query = `UPDATE users SET ${Object.keys(data)
    //     .map((key) => `${key} = ?`)
    //     .join(', ')} WHERE id = ?`;

    const { query: queryWithoutCondition, values } = updateQueryBuilder('users', data);
    const query = queryWithoutCondition + 'WHERE id = ?';

    const [result] = await promisePool.execute(query, [...values, id]);
    return result;
};

export const updateProfileImage = async (data) => {
    const query = 'UPDATE users SET profile_image = ? WHERE id = ? AND email = ?';
    const [result] = await promisePool.execute(query, data);
    return result;
};
