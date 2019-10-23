import React from 'react';
import styled from "styled-components"

const StyledRoom = styled.div`
    border: 2px solid #3e2723;
    background: #2e7d32;
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

const Door = styled.div`
    position: absolute;
    background: #2e7d32;
    left: ${props => props.left && `${props.left}px` };
    top: ${props => props.top && `${props.top}px`}
    width: ${props => props.dimension && `${props.width}px` };
    height: ${props => props.dimension && `${props.width}px` };
    z-index: 998;
`

const Room = ({room, playerRoom, dimension}) => {
    const doorWidth = dimension / 4
    return ( 
        <>
        {!!room.n_to && <Door left={room.x + (dimension / 2 - doorWidth / 2)} top={room.y - doorWidth / 2 + 2} dimension={dimension} width={doorWidth}/>}
        {!!room.w_to && <Door left={room.x - doorWidth / 2 - 2} top={room.y + (dimension / 2 - doorWidth / 2)} dimension={dimension} width={doorWidth}/>}
        <StyledRoom  x={room.x} y={room.y} dimension={dimension} id={room.pk}>
                
                {/* {
                    (playerRoom && room && playerRoom.title === room.title) && <Player></Player>
                } */}
        </StyledRoom>
        </>
     );
}

export default Room
