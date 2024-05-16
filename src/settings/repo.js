import { updateQueryBuilder } from '../utils/common.js';
import MysqlConnection from '../db/index.js';

const promisePool = MysqlConnection.connection();

export const updateSettings = async (data, id) => {
    const { query: queryWithoutCondition, values } = updateQueryBuilder('settings', data);
    const query = queryWithoutCondition + 'WHERE user_id = ?;';
    const result = await promisePool.execute(query, [...values, id]);
    return result;
};
