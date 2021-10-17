import React, { useState, useMemo, useCallback, useRef } from 'react'
import { DraggableItem } from '../Item'
import ItemList from '../../styles/ItemList'
import DropItemBox from '../DropItemBox/DropItemBox'
import MOVE_ITEM_TYPES from '../../constants/moveItemTypes'
import DropContainer from '../../styles/DropContainer'
import BannerApi from '../../api/BannerApi'
import { useLoading } from '../../hooks/Loading'
import { toast } from 'react-toastify'
import formatError from '../../helpers/functions/formatError'
import validateBanner from '../../helpers/validators/validateBanner'
import TitleSpan from '../../styles/TitleSpan'
import TextInput from '../../styles/TextInput'
import FormContainer from '../../styles/FormContainer'
import TextAreaInput from '../../styles/TextAreaInput'
import ContentContainer from '../../styles/ContentContainer'
import BannerPropsContainer from '../../styles/BannerPropsContainer'
import ActionButton from '../../styles/ActionButton'
import TextInputContainer from '../../styles/TextInputContainer'
import ActionsContainer from '../../styles/ActionsContainer'

export default function ManageBanner({ items }) {
    const { setShowLoading } = useLoading()

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
                name: (bannerName.current || '').trim(),
                description: (bannerDescription.current || '').trim(''),
                items: selectedItems.map((item) => ({
                    id: item.id,
                    isLimited: item.isLimited
                }))
            }
            setShowLoading(true)
            if (!(await validateBanner(bannerData))) {
                if (!bannerData.name) {
                    toast.warn('Missing name')
                    return
                }
                if (!bannerData.items.length || !bannerData.items.some(item => item.isLimited)) {
                    toast.warn('Need to add at least one limited item')
                    return
                }
            }
            await BannerApi.createBanner(bannerData)
            toast.success('Banner successfully created!')
        } catch (err) {
            toast.error(formatError(err))
        } finally {
            setShowLoading()
        }
    }

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
                        bgcolor='white'
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
                    <TitleSpan>Limited Items</TitleSpan>
                    <DropItemBox
                        items={limitedItems}
                        addItem={(item) => addItem(item, true)}
                        onDiscard={onDiscard}
                        selectedItems={selectedItems}
                    />
                </DropContainer>

                <DropContainer>
                    <TitleSpan>General Items</TitleSpan>
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
