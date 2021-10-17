import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import styled from 'styled-components'
import { TextField, Button } from '@material-ui/core'
import axios from 'axios'
import { DraggableItem } from '../Item'
import ItemList from '../../styles/ItemList'
import DropItemBox from '../DropItemBox/DropItemBox'
import MOVE_ITEM_TYPES from '../../constants/moveItemTypes'
import DropContainer from '../../styles/DropContainer'
import BannerApi from '../../api/BannerApi'
import { useLoading } from '../../hooks/Loading'
import { toast } from 'react-toastify'
import formatError from '../../helpers/formatError'

export default function ManageBanner() {
    const { setShowLoading } = useLoading()

    const [items, setItems] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const bannerName = useRef('')
    const bannerDescription = useRef('')

    const [limitedItems, generalItems] = useMemo(() => {
        const bannerItems = [[], []]
        selectedItems.forEach((item) => {
            if (item.isLimited) bannerItems[0].push(item)
            else bannerItems[1].push(item)
        })
        return bannerItems
    }, [selectedItems])

    const saveBanner = async () => {
        try {
            const bannerData = {
                name: bannerName.current,
                description: bannerDescription.current,
                items: selectedItems.map((item) => ({
                    id: item.id,
                    isLimited: item.isLimited
                }))
            }
            setShowLoading(true)
            await BannerApi.createBanner(bannerData)
            toast.success('Banner successfully created!')
        } catch (err) {
            toast.error(formatError(err))
        } finally {
            setShowLoading()
        }
    }

    useEffect(() => {
        axios.get('/api/getItems').then((res) => {
            setItems(res.data)
        })
    }, [])

    const addItem = useCallback(
        (item, isLimited) => {
            const itemToAdd = { ...item, isLimited }
            const filteredItems = selectedItems.filter((oldItem) => {
                return oldItem.id !== item.id
            })
            setSelectedItems([...filteredItems, itemToAdd])
        },
        [selectedItems]
    )

    const onDiscard = useCallback(
        (item) => {
            const filteredItems = selectedItems.filter((oldItem) => {
                return oldItem.id !== item.id
            })
            setSelectedItems(filteredItems)
        },
        [selectedItems]
    )

    return (
        <FormContainer>
            <BannerPropsContainer>
                <TextInputContainer>
                    <TextInput
                        variant='standard'
                        label='Banner name'
                        defaultValue={bannerName.current}
                        onChange={({ target }) => {
                            bannerName.current = target.value
                        }}
                        bgColor='white'
                    />
                </TextInputContainer>

                <ActionsContainer>
                    <ActionButton variant='contained' isCancel>
                        Cancel
                    </ActionButton>

                    <ActionButton variant='contained' onClick={saveBanner}>
                        Save
                    </ActionButton>
                </ActionsContainer>
            </BannerPropsContainer>

            <ContentContainer>
                <DropContainer>
                    <Span>Limited Items</Span>
                    <DropItemBox
                        items={limitedItems}
                        addItem={(item) => addItem(item, true)}
                        onDiscard={onDiscard}
                        selectedItems={selectedItems}
                    />
                </DropContainer>

                <DropContainer>
                    <Span>General Items</Span>
                    <DropItemBox
                        items={generalItems}
                        addItem={(item) => addItem(item, false)}
                        onDiscard={onDiscard}
                        selectedItems={selectedItems}
                    />
                </DropContainer>

                <TextAreaInput
                    variant='filled'
                    label='Description'
                    multiline
                    rows={12}
                    defaultValue={bannerDescription.current}
                    onChange={({ target }) => {
                        bannerDescription.current = target.value
                    }}
                />
            </ContentContainer>

            <ContentContainer>
                <ItemList>
                    {items.map((item) => (
                        <DraggableItem
                            key={item.id}
                            item={item}
                            dragType={MOVE_ITEM_TYPES.ADD_ITEM}
                        />
                    ))}
                </ItemList>
            </ContentContainer>
        </FormContainer>
    )
}

const Span = styled.span`
    font-family: Roboto;
    font-size: 18px;
`

const TextInput = styled(TextField)`
    background: ${(props) => props.bgColor || 'none'};
    width: 100%;
`

const TextAreaInput = styled(TextField)`
    background-color: transparent;
    width: 100%;
`

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
`

const ContentContainer = styled.div`
    background-color: #c4c4c4;
    width: 100%;
    height: 40vh;
    box-sizing: border-box;
    padding: 10px;
    overflow: auto;
`

const BannerPropsContainer = styled.div`
    height: 10vh;
    background-color: #c4c4c4;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    overflow: auto;
    display: flex;
    align-items: center;
`

const ActionButton = styled(Button)`
    background-color: ${(props) => (props.isCancel ? '#ED2939' : '#1167b1')};
    margin-right: 12.5px;

    :hover {
        background-color: ${(props) => props.isCancel ? '#8D021F' : '#03254c'};
    }
`

const TextInputContainer = styled.div`
    width: calc(100% - 200px);
`

const ActionsContainer = styled.div`
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
`
