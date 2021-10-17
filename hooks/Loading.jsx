import React, { createContext, useContext } from 'react'
import LoadingScreen from '../components/LoadingScreen'

const LoadingContext = createContext({})

const LoadingProvider = ({ children }) => {
    const setShowLoading = (isShowing) => {
        const loadingContainer = document.getElementById('loading-container')
        if (loadingContainer) {
            loadingContainer.style.visibility = isShowing ? 'visible' : 'hidden'
        }
    }

    return (
        <LoadingContext.Provider value={{ setShowLoading }}>
            <LoadingScreen />
            {children}
        </LoadingContext.Provider>
    )
}

const useLoading = () => {
    return useContext(LoadingContext)
}

export { useLoading, LoadingProvider }
