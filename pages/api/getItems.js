import getConnection from "../../db/getConnection";

let queryExecutor;
export default async function getBanners (_, res) {
    if (!queryExecutor) {
        queryExecutor = getConnection();
    }
    const rows = await queryExecutor(`
        SELECT * FROM Items
        ORDER BY type ASC, rarity DESC ,name ASC
    `);

    res.status(200).json(rows);
};