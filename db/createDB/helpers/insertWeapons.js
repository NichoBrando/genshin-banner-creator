const axios = require('axios');
const itemList = require('../items.json');
const { v4 } = require('uuid');

const insertWeapons = async (query) => {
    const { data } = await axios.get('https://genshinlist.com/api/weapons');
    const compareName = (name = '') => {
        return name.replace(/[']/g, '').toLowerCase();
    }
    const weapons = data.map(weapon => {
        const image = itemList.find(image => {
            return compareName(image.name) === compareName(weapon.name);
        });
        if (!image) {
            return null;
        }
        return {
            id: v4(),
            item_id: v4(),
            name: weapon.name,
            rarity: weapon.rarity,
            image: image?.src || ''
        };
    }).filter(item => item);

    const itemsQuery = weapons.reduce((counter, weapon, index) => {
        return counter + ` ("${weapon.item_id}", "${weapon.name}", ${weapon.rarity}, "weapon", "${weapon.image}")${index !== weapons.length - 1 ? ',' :';'}`
    }, `INSERT INTO Items (id, name, rarity, type, image) VALUES `);

    const weaponsQuery = weapons.reduce((counter, weapon, index) => {
        return counter + ` ("${weapon.id}", "${weapon.item_id}")${index !== weapons.length - 1 ? ',' :';'}`
    }, `INSERT INTO Weapons (id, item_id) VALUES `);

    await query(
        itemsQuery
    );

    await query(
        weaponsQuery
    );
    return;
}

module.exports = insertWeapons
