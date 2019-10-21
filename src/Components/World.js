import React from 'react'
import styled from "styled-components"

export const GameArea = styled.div`
    background: white;
    grid-column: 2 / 9;
    grid-row: 2 / 9;
`

const World = () => {
    return ( 
        <GameArea >
            Super basic game area
        </GameArea>
     );
}
 
export default World;