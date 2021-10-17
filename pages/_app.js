import React from 'react'
import { LoadingProvider } from '../hooks/Loading'
import GlobalCSS from '../styles/global'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <GlobalCSS />
            <LoadingProvider>
                <Component {...pageProps} />
                <ToastContainer
                    position='top-right'
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover
                />
            </LoadingProvider>
        </>
    )
}

export default MyApp
