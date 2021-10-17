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

    const executeQuery = util.promisify(db.execute).bind(db)
    return async (query) => {
        try {
            const binaryRows = await executeQuery(query)
            return JSON.parse(JSON.stringify(binaryRows))
        } catch (err) {
            console.error(err)
        }
        return []
    }
}

module.exports = getConnection
