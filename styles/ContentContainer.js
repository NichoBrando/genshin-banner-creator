import styled from 'styled-components'

export default styled.div`
    background-color: #c4c4c4;
    width: 100%;
    position: relative;
    height: ${props => props.height ? `${props.height}%` : '40vh'};
    box-sizing: border-box;
    padding: ${props => props.noPadding ? '0px' : '10px'};
    overflow: auto;
`
