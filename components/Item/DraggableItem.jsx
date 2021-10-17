import React from 'react'
import Item from './Item'
import { useDrag } from 'react-dnd'
import MOVE_ITEM_TYPES from '../../constants/moveItemTypes'

const DraggableItem = ({ item, dragType, onDiscard, selectedItems }) => {
    const [, dragRef] = useDrag(
        {
            type: dragType,
            item: {
                payload: {
                    ...item
                }
            },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
                monitor: monitor
            }),
            end: (item, monitor) => {
                if (
                    dragType === MOVE_ITEM_TYPES.CHANGE_PRIORITY &&
                    !monitor.didDrop() &&
                    onDiscard
                ) {
                    onDiscard(item.payload)
                }
            }
        },
        [dragType, selectedItems]
    )

    return <Item itemRef={dragRef} item={item} />
}

export default DraggableItem
