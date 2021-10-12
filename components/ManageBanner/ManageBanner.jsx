import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { TextField } from "@material-ui/core";
import axios from 'axios';
import Item from '../Item';
import ItemDragLayer from '../ItemDragLayer';

export default function ManageBanner() {

  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const [limitedItems, generalItems] = useMemo(() => {
      const bannerItems = [[], []];
      selectedItems.forEach(item => {
          if (item.isLimited) bannerItems[0].push(item);
          else bannerItems[1].push(item);
      });
      return bannerItems;
  }, [selectedItems]); 

  useEffect(() => {
      axios.get('/api/getItems').then(res => {
          setItems(res.data);
      });
  }, []);

  return (
    <FormContainer>
        <ContentContainer>
            <TextInput 
                variant="standard" 
                label="Banner name"
            />

            <Span>Limited Items</Span>
            <ItemList>
                {limitedItems.map(item => (<Item 
                    key={item.id} 
                    item={item} 
                />))}
            </ItemList>

            <Span>General Items</Span>
            <ItemList>
                {generalItems.map(item => (<Item 
                    key={item.id} 
                    item={item} 
                />))}
            </ItemList>

            <TextAreaInput 
                variant="filled" 
                label="Description"
                multiline
            />

        </ContentContainer>

        <ContentContainer>
            <ItemList>
                {items.map(item => (<Item 
                    key={item.id} 
                    item={item} 
                />))}
            </ItemList>
        </ContentContainer>

        <ItemDragLayer />
    </FormContainer>
  )
}

const Span = styled.span`
    font-family: Roboto;
    font-size: 18px;
`;

const TextInput = styled(TextField)`
    background-color: transparent;
    width: 100%;
`;

const TextAreaInput = styled(TextField)`
    background-color: transparent;
    width: 100%;
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90vh;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
`;

const ItemList = styled.div`
    width: 100%;
    margin: 10px 0;
    background-color: #8C8C8C;
    padding: 5px;
    display: flex;
    border-radius: 5px;
    flex-wrap: wrap;
    min-height: 100px;
`;

const ContentContainer = styled.div`
    background-color: #C4C4C4;
    width: 100%;
    height: 40vh;
    box-sizing: border-box;
    padding: 10px;
    overflow: auto;
`;