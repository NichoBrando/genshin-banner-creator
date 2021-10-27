import React from 'react'

import { Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import Item from '../Item'

import ContentContainer from '../../styles/ContentContainer'
import HeaderRow from '../../styles/HeaderRow'
import HeaderTable from '../../styles/HeaderTable'
import TableTitle from '../../styles/TableTitle'
import ItemListContainer from '../../styles/ItemListContainer'

import bannerListColumns from '../../constants/bannerListColumns'
import { format } from 'date-fns'

const BannerListManager = ({ banners }) => {

    const getData = (banner, column) => {
        if (column.type === 'time'){
            if (banner[column.id]) {
                return format(new Date(banner[column.id]), 'dd/M/yyyy')
            }
            return column.title === 'Start' ? '' : 'Unlimited'
        }
        if (column.id === 'items' ) {
            const limitedItems = banner.items.filter(el => el.isLimited)
            console.log(limitedItems)
            return (
                <ItemListContainer>
                    {limitedItems.map(item => {
                        return (
                            <Item key={`${banner.id}-item-${item.id}`} item={item} />
                        )
                    })}
                </ItemListContainer>
            )
        }
        return banner[column.id] ?? ''
    }

    return (
        <ContentContainer height={100} noPadding>
            <Table>
                <HeaderTable>
                    <HeaderRow>
                        {
                            bannerListColumns.map(
                                column => (
                                    <TableCell>
                                        <TableTitle>{column.name}</TableTitle>
                                    </TableCell>
                                )
                            )
                        }
                        <TableCell />
                    </HeaderRow>
                </HeaderTable>
                <TableBody>
                    {banners.map(
                        banner => {
                            return (
                                <TableRow>
                                    {
                                        bannerListColumns.map(column => (
                                            <TableCell key={`${banner.id}-${column.id}`}>
                                                {getData(banner, column)}
                                            </TableCell>
                                        ))
                                    }
                                    <TableCell>
                                        Test
                                    </TableCell>
                                </TableRow>
                            );
                        }
                    )}
                </TableBody>
            </Table>
        </ContentContainer>
    )
}

export default BannerListManager
