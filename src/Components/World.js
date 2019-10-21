import React, {useEffect, useState} from 'react'
import styled from "styled-components"
import Rooms from "./Rooms"

export const GameArea = styled.div`
    background: white;
    grid-column: 2 / 9;
    grid-row: 2 / 9;
    display: flex;
    justify-content: center;
    align-items: center;
    position:relative;
    // overflow: scroll;
`

const World = ({rooms}) => {
    const [center, setCenter] = useState({x:0, y:0})
    useEffect(() => {
        const gameArea = document.querySelector('#game-area')
        console.dir(gameArea)
        let height = gameArea.offsetHeight;
        let width = gameArea.offsetWidth;
        setCenter({x: width / 2, y: height / 2})
    }, [])
    console.log(center)
    return ( 
        <GameArea id="game-area">
            <Rooms rooms={rooms}/>
        </GameArea>
     );
}
 
export default World;