const getItemsFromDB = async (queryExecutor) => {
    return await queryExecutor(`
        SELECT * FROM Items
        ORDER BY type ASC, rarity DESC ,name ASC
    `)
}

export default getItemsFromDB
