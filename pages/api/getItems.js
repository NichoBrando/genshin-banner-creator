import getConnection from '../../db/getConnection'
import getItemsFromDB from '../../db/queries/getItems'

let queryExecutor

export default async function getItems(_, res) {
    if (!queryExecutor) {
        queryExecutor = getConnection()
    }

    const rows = await getItemsFromDB(queryExecutor)
    res.status(200).json(rows)
}
