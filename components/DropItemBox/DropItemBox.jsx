import React from 'react'
import { useDrop } from 'react-dnd'
import ItemList from '../../styles/ItemList'
import { DraggableItem } from '../Item'
import MOVE_ITEM_TYPES from '../../constants/moveItemTypes'

const DropItemBox = ({ items, addItem, onDiscard, selectedItems }) => {
    const [, drop] = useDrop(
        {
            accept: [MOVE_ITEM_TYPES.ADD_ITEM, MOVE_ITEM_TYPES.CHANGE_PRIORITY],
            drop: (item) => {
                addItem(item.payload)
            }
        },
        [selectedItems]
    )

    return (
        <ItemList ref={drop}>
            {items.map((item) => (
                <DraggableItem
                    key={item.id}
                    item={item}
                    dragType={MOVE_ITEM_TYPES.CHANGE_PRIORITY}
                    onDiscard={onDiscard}
                    selectedItems={selectedItems}
                />
            ))}
        </ItemList>
    )
}

export default DropItemBox
