import styled from 'styled-components'

export default styled.div`
    height: 10vh;
    width: 100vw;
    background-color: #222043;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 10px;

    @media screen and (min-width: 600px) {
        height: 100vh;
        width: 100px;
        flex-direction: column;
    }
`
