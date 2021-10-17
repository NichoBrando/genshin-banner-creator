import React from 'react'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components'
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/styles'

export default class Document extends NextDocument {
    static async getInitialProps(ctx) {
        const styledComponentSheet = new StyledComponentSheets()
        const materialUiSheets = new MaterialUiServerStyleSheets()
        const originalRenderPage = ctx.renderPage
        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        styledComponentSheet.collectStyles(
                            materialUiSheets.collect(<App {...props} />)
                        )
                })
            const initialProps = await NextDocument.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: [
                    <React.Fragment key='styles'>
                        {initialProps.styles}
                        {materialUiSheets.getStyleElement()}
                        {styledComponentSheet.getStyleElement()}
                    </React.Fragment>
                ]
            }
        } finally {
            styledComponentSheet.seal()
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel='preconnect'
                        href='https://fonts.googleapis.com'
                    />
                    <link
                        rel='preconnect'
                        href='https://fonts.gstatic.com'
                        crossOrigin
                    />
                    <link
                        href='https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap'
                        rel='stylesheet'
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
