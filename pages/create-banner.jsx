import React from 'react'
import Sidebar from './../components/Sidebar'
import PageContainer from '../styles/PageContainer'
import ManageBanner from '../components/ManageBanner'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import getConnection from '../db/getConnection'
import getItemsFromDB from '../db/queries/getItems'

let queryExecutor

export default function CreateBanner({ items }) {
    return (
        <PageContainer>
            <Sidebar />
            <DndProvider backend={HTML5Backend}>
                <ManageBanner items={items} />
            </DndProvider>
        </PageContainer>
    )
}

export async function getServerSideProps() {
    if (!queryExecutor) {
        queryExecutor = getConnection()
    }

    const items = await getItemsFromDB(queryExecutor)

    return {
        props: {
            items
        }
    }
}
