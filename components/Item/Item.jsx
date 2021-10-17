import React from 'react'
import { Tooltip } from '@material-ui/core'
import ItemBlock from '../../styles/ItemBlock'

const Item = ({ item, itemRef }) => {
    return (
        <Tooltip title={`${item.name} | ${item.rarity}*`}>
            <ItemBlock
                ref={itemRef}
                src={item.image}
                rarity={item.rarity?.toString() || ''}
            />
        </Tooltip>
    )
}

export default Item
