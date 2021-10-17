import styled from 'styled-components'

export default styled.div`
    display: flex;
    flex-direction: column-reverse;
    height: 100vh;
    width: 100vw;
    overflow: hidden;

    @media screen and (min-width: 600px) {
        flex-direction: row;
    }
`
