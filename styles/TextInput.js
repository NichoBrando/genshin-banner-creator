import styled from 'styled-components'
import { TextField } from '@material-ui/core'

export default styled(TextField)`
    background: ${(props) => props.bgcolor || 'none'};
    width: 100%;
`