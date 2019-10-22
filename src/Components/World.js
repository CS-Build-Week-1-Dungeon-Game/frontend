import React, {useEffect, useState} from 'react'
import styled from "styled-components"

import Room from "./Room"

export const StyledRooms = styled.div`
    background: transparent;
    position: relative;
    left: ${props => props.left && `${props.left}px` };
    top: ${props => props.top && `${props.top}px` };
    transition: left 0.2s, top 0.2s;
`

export const GameArea = styled.div`
    background: grey;
    grid-column: 2 / 9;
    grid-row: 2 / 9;
    position:relative;
    overflow: hidden;
`

const World = ({rooms, currentRoom, moveRooms, dimension}) => {
    const [center, setCenter] = useState({x:0, y:0})
    
    useEffect(() => {
        const gameArea = document.querySelector('#game-area')
        let height = gameArea.offsetHeight;
        let width = gameArea.offsetWidth;
        if (currentRoom) {
            setCenter({x: (width / 2) - (currentRoom.x + dimension / 2), y: (height / 2) - currentRoom.y - dimension / 2})
        }
    }, [currentRoom, dimension])
    
    return ( 
        <GameArea id="game-area">
            <StyledRooms left={center.x} top={center.y}>
            {rooms && rooms.map(room => <Room room={room} key={room.pk} moveRooms={moveRooms} dimension={dimension}/>)}
            </StyledRooms>
        </GameArea>
     );
}
 
export default World;