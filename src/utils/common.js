import JWT from 'jsonwebtoken';

export function verifyToken(token) {
    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (_error) {
        return 'token expired';
    }
}

export function insertQueryBuilder(table, object) {
    const columns = Object.keys(object);
    const values = Object.values(object);

    const query = 'INSERT INTO ' + table + ' (' + columns.map((c) => c) + ') VALUES (' + columns.map(() => '?') + ');';
    return { query, values };
}

/* query builder return query with where conditions */
export function updateQueryBuilder(table, object) {
    const columns = Object.keys(object);
    const values = Object.values(object);

    const query = 'UPDATE ' + table + ' SET ' + columns.map((c) => `${table}.${c}=?`) + ' ';
    return { query, values };
}
