import styled from 'styled-components'
import { Button } from '@material-ui/core'

export default styled(Button)`
    background-color: ${(props) => (props.isCancel ? '#ED2939' : '#1167b1')};
    margin-right: 12.5px;

    :hover {
        background-color: ${(props) =>
            props.isCancel ? '#8D021F' : '#03254c'};
    }
`
