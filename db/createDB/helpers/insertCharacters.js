const axios = require('axios');
const itemList = require('../items.json');
const { v4 } = require('uuid');

const insertCharacters = async (query) => {
    const { data } = await axios.get('https://genshinlist.com/api/characters');
    const characters = data.map(character => {
        const image = itemList.find(image => {
            return image.name === character.name;
        });
        if (!image) {
            console.log(character.name);
        }
        return {
            id: v4(),
            item_id: v4(),
            name: character.name,
            rarity: character.rarity,
            image: image?.src || ''
        };
    });

    const items = characters.reduce((counter, character, index) => {
        return counter + ` ("${character.item_id}", "${character.name}", ${character.rarity}, "character", "${character.image}")${index !== characters.length - 1 ? ',' :';'}`
    }, `INSERT INTO Items (id, name, rarity, type, image) VALUES `);

    const characterInsert = characters.reduce((counter, character, index) => {
        return counter + ` ("${character.id}", "${character.item_id}")${index !== characters.length - 1 ? ',' :';'}`
    }, `INSERT INTO Characters (id, item_id) VALUES `);

    await query(
        items
    );

    await query(
        characterInsert
    );
}

module.exports = insertCharacters
