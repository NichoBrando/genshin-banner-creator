import getConnection from "../../db/getConnection";

let queryExecutor;
export default async function getBanners (req, res) {
    if (!queryExecutor) {
        queryExecutor = getConnection();
    }
    let query = `
        SELECT * FROM Banners
    `;
    const joinStatement = `
        
    `;
    if (req.query.fromHome) {
        query += `
            WHERE end_date < NOW()
            ORDER BY start_day DESC
            LIMIT 3
        `
    }
    else {
        query += `
            ORDER BY start_day DESC
        `;
    }
    const data = queryExecutor(`
        SELECT * FROM Banners
        
    `);
};