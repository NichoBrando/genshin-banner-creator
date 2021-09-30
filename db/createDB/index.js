const insertCharacters = require('./helpers/insertCharacters');
const insertWeapons = require('./helpers/insertWeapons');
const Promise = require('bluebird');
const getConnection = require('../getConnection');
require('dotenv').config({ path: './.env.local' });

const createDB = async () => {
    const query = getConnection();

    await query(
        'DELETE FROM Characters'
    );
    
    await query(
        'DELETE FROM Weapons'
    );
        
    await query(
        'DELETE FROM Items'
    );

    await Promise.each(
        [insertWeapons, insertCharacters],
        async action => await action(query)
    );
    process.exit(0);
};

createDB();