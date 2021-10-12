import React, { useEffect } from 'react';
import { Tooltip } from '@material-ui/core';
import { getEmptyImage } from 'react-dnd-html5-backend';
import ItemBlock from '../../styles/ItemBlock';
import { useDrag } from 'react-dnd';

const Item = ({ item }) => {
    const [, dragRef, preview] = useDrag(
        {
            type: 'item',
            item: {
                payload: {
                    ...item
                }
            },
            collect: monitor => ({
                isDragging: !!monitor.isDragging(),
                monitor: monitor
            })
        },
        []
    );

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: false });
    }, []);

    return (
        <Tooltip title={`${item.name} | ${item.rarity}*`} rarity={item.rarity?.toString() || ''}>
            <ItemBlock ref={dragRef} src={item.image} />
        </Tooltip>
    );
};

export default Item;