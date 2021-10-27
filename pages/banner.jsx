import React from 'react'
import Sidebar from './../components/Sidebar'
import PageContainer from '../styles/PageContainer'
import getConnection from '../db/getConnection'
import getBanners from '../db/queries/getBanners'
import BannerListManager from '../components/BannerListManager'
import BannerManagerContainer from '../styles/BannerManagerContainer'

let queryExecutor

export default function CreateBanner({ banners }) {
    console.log(banners)
    return (
        <PageContainer>
            <Sidebar />
            <BannerManagerContainer>
                <BannerListManager banners={banners} />
            </BannerManagerContainer>
        </PageContainer>
    )
}

export async function getStaticProps() {
    if (!queryExecutor) {
        queryExecutor = getConnection()
    }

    const banners = await getBanners(queryExecutor)
    return {
        props: {
            banners
        },
        revalidate: 60
    }
}
