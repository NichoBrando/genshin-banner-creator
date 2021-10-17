import React from 'react'
import SidebarContainer from '../../styles/SidebarContainer'
import Image from 'next/image'

const Sidebar = () => {
    return (
        <SidebarContainer>
            <Image src='/genshin-icon.png' alt='home' width='60' height='60' />
            <Image src='/wish-icon.png' alt='home' width='50' height='50' />
            <Image
                src='/inventory-icon.png'
                alt='home'
                width='50'
                height='45'
            />
        </SidebarContainer>
    )
}

export default Sidebar
