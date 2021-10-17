import { v4 } from 'uuid'
import getConnection from '../../db/getConnection'
import Promise from 'bluebird'

let queryExecutor

export default async function createBanner(req, res) {
    const id = v4()
    const bannerData = req.body

    if (!queryExecutor) {
        queryExecutor = getConnection()
    }
    const addedInTable = []

    try {
        const result = await queryExecutor(`SELECT COUNT(name) as nameCount FROM Banners WHERE name = "${bannerData.name}"`)

        if(result[0]['nameCount']) {
            res.status(400).json({
                message: 'Name is already in use!'
            })
            return
        }

        await queryExecutor(`
            INSERT INTO Banners (id, name, description, startDay, endDay) 
            VALUES ("${id}", "${bannerData.name}", "${bannerData.description}",
            ${bannerData.startDay || null}, ${bannerData.endDay || null})
        `)
        addedInTable.push({ name: 'Banners', column: 'id' })

        const itemsToInsert = bannerData.items.reduce(
            (counter, item, index) => {
                return `${counter} ("${v4()}", "${item.id}", "${id}", ${
                    item.isLimited
                })${index === bannerData.items.length - 1 ? '' : ','}`
            },
            ''
        )

        await queryExecutor(`
            INSERT INTO BannerItems (id, itemId, bannerId, isLimited)
            VALUES ${itemsToInsert}
        `)

        addedInTable.push({ name: 'BannerItems', column: 'bannerId' })
    } catch (err) {
        await Promise.each(addedInTable, async (tableInfo) => {
            await queryExecutor(`
                    DELETE FROM ${tableInfo.name} WHERE ${tableInfo.column} = "${id}"
                `)
        })
        res.status(400).json({
            message: 'Invalid data!'
        })
        return
    }
    res.status(200).json({
        message: `Banner ${bannerData.name} sucessfully created!`
    })
}
