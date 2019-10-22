import React from 'react';
import styled from "styled-components"

const StyledRoom = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid yellow;
    background: green;
    height: ${props => props.dimension && `${props.dimension}px` };
    width: ${props => props.dimension && `${props.dimension}px` };
    position: absolute;
    left: ${props => props.x && `${props.x}px` };
    top: ${props => props.y && `${props.y}px` };
    & * {
        pointer-events: none;
    }
`
const Player = styled.div`
width: 15px;
height: 15px;
border-radius: 50%;
background: red;
display: inline-block;
`

const Room = ({room, playerRoom, dimension}) => {
    // console.log(room, playerRoom)
    return ( 
        <StyledRoom  x={room.x} y={room.y} dimension={dimension} id={room.pk}>
            <p>{room.title}</p>
                {
                    (playerRoom && room && playerRoom.title === room.title) && <Player></Player>
                }
        </StyledRoom>
     );
}

export default Room
