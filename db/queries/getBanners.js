import getBannerItemsFromDB from './getBannerItems'

const getBanners = async (queryExecutor) => {
    const availableBanners = await queryExecutor(`
        SELECT * FROM Banners;
    `)

    const ids = availableBanners.reduce((counter, banner) => {
        return `${counter ? `${counter}, ` : ''}"${banner.id}"`
    }, '')

    const items = await getBannerItemsFromDB(queryExecutor, ids)

    return availableBanners.map((banner) => {
        const bannerItems = items
            .filter((item) => item.bannerId === banner.id)
            .map((item) => ({
                id: item.id,
                isLimited: Boolean(item.isLimited),
                name: item.name,
                charId: item.charId,
                weaponId: item.weaponId
            }))
        return {
            ...banner,
            items: bannerItems
        }
    })
}

export default getBanners
