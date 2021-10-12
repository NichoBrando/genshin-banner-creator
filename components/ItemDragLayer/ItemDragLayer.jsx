import React, { useEffect, useMemo, useState } from 'react';
import { useDragLayer } from 'react-dnd';
import reactDom from 'react-dom';
import ItemBlock from '../../styles/ItemBlock';

const ItemDragLayer = () => {
    const [container, setContainer] = useState();

    const { item, itemType, currentOffset, isDragging, initialOffset, initialSourceClientOffset } = useDragLayer(
        monitor => {
            return {
                item: monitor.getItem(),
                itemType: monitor.getItemType(),
                currentOffset: monitor.getSourceClientOffset(),
                initialSourceClientOffset: monitor.getInitialSourceClientOffset(),
                initialOffset: monitor.getInitialClientOffset(),
                isDragging: monitor.isDragging()
            };
        }
    );

    useEffect(() => {
        setContainer(document.getElementById('popup-container'));
    }, []);

    const position = useMemo(() => {
        if (!container) return {};
        if (isDragging) {
            container.style.visibility = "visible";
        }
        if (!currentOffset) {
            container.style.visibility = "hidden";
            return {
                display: 'none'
            };
        }
        const { x, y } = currentOffset;
        const transform = `translate(${x}px, ${y}px)`;
        return {
            transform,
            WebkitTransform: transform
        };
    }, [
        currentOffset, 
        initialSourceClientOffset, 
        isDragging, 
        initialOffset, 
        isDragging,
        container
    ]);

    console.log(position);
    console.log(`${!isDragging} || ${Boolean(!item?.payload)}`);
    if (!isDragging || !item?.payload) return null;

    console.log(position);

    return reactDom.createPortal(
        <div 
            style={{
                position: 'absolute',
                ...position
            }}
        >
            <ItemBlock src={item.payload.image} />
        </div>,
        document.getElementById('popup-container')
    );
};

export default ItemDragLayer;