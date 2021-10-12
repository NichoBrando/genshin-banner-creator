import styled from 'styled-components';
import itemColors from '../constants/itemColors';

export default styled.img.attrs(props => ({rarity: props.rarity}))`
    width: 80px;
    height: 80px;
    margin: 10px;
    padding: 0px 5px;
    border-radius: 5px;
    background-color: ${props => itemColors[(props.rarity || '')]};
    border: 1px solid black;
`;