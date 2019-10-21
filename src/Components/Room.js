import React, {useEffect} from 'react';
import styled from "styled-components"

const StyledRoom = styled.div`
    background: green;
    height: ${props => props.dimension && `${props.dimension}rem` };
    width: ${props => props.dimension && `${props.dimension}rem` };
    position: absolute;
    border: 1px solid black;
    left: ${props => props.x && `${props.x}rem` };
    top: ${props => props.y && `${props.y}rem` };
`



const Room = ({room, position}) => {
    const dimension = 5
    useEffect(() => {

    }, []) 
    return ( 
        <StyledRoom x={room.x * dimension} y={room.y * dimension} dimension={dimension}>
            <p>{room.title}</p>
        </StyledRoom>
     );
}
 
export default Room;