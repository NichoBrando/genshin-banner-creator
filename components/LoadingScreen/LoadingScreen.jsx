import React from 'react'
import { CircularProgress } from '@material-ui/core'
import LoadingContainer from '../../styles/LoadingContainer'

const LoadingScreen = () => {
    return (
        <LoadingContainer id='loading-container'>
            <CircularProgress />
        </LoadingContainer>
    )
}

export default LoadingScreen
