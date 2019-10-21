import React from 'react';
import styled from "styled-components"
import Room from "./Room"

export const StyledRooms = styled.div`
    background: blue;
    position: relative;
    // top: 100px;
    border: 1px solid red;
`

const Rooms = ({rooms}) => {
    return ( 
        <StyledRooms style={{}}>
            {rooms && rooms.map(room => <Room room={room} key={room.pk} />)}
        </StyledRooms>
     );
}
 
export default Rooms;