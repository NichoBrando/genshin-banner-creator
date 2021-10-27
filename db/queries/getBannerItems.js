const getBannerItemsFromDB = async (queryExecutor, ids) => {
    return await queryExecutor(`
    SELECT 
        BannerItems.id, BannerItems.bannerId, BannerItems.isLimited, Items.name, Characters.id AS charId, Weapons.id AS weaponId  FROM BannerItems
        LEFT JOIN Items ON Items.id = BannerItems.itemId
        LEFT JOIN Characters ON Characters.itemId = BannerItems.itemId
        LEFT JOIN Weapons ON Weapons.itemId = BannerItems.itemId
        WHERE BannerItems.bannerId in (${ids});
`)
}

export default getBannerItemsFromDB
