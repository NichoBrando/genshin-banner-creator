import GlobalCSS from '../styles/global';
import PopUpContainer from '../styles/PopUpContainer';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalCSS/>
      <Component {...pageProps} />
      <PopUpContainer id="popup-container"/>
    </>
  )
}

export default MyApp
