const mysql = require('mysql2')
const util = require('util')

const getConnection = () => {
    const db = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })

    const query = util.promisify(db.execute).bind(db)
    return query
}

module.exports = getConnection
