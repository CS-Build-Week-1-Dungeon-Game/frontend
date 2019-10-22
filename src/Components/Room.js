import React from 'react';
import styled from "styled-components"

const StyledRoom = styled.div`
    background: green;
    height: ${props => props.dimension && `${props.dimension}px` };
    width: ${props => props.dimension && `${props.dimension}px` };
    position: absolute;
    border: 1px solid black;
    left: ${props => props.x && `${props.x}px` };
    top: ${props => props.y && `${props.y}px` };
    & * {
        pointer-events: none;
    }
`



const Room = ({room, moveRooms, dimension}) => {
    const handleClick = (e, room) => {
        moveRooms(e, room)
    }
    return ( 
        <StyledRoom onClick={(e) =>handleClick(e, room)} x={room.x} y={room.y} dimension={dimension} id={room.pk}>
            <p>{room.title}</p>
        </StyledRoom>
     );
}
 
export default Room;