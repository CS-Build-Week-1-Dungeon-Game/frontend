import React from 'react'
import styled from "styled-components"


const StyledAside = styled.aside`
background: black;
border-left: 2px solid white;
grid-column: 10 / span 3;
grid-row: 1 / span 12;
`

const MiniMap = styled.div`
width: 18rem;
height: 14rem;
background: green;
border-radius: 25px;
`
const PlayerInfo = styled.div`
display: flex;
flex-direction: column;
align-items: center;
color: white;

`

const Username = styled.h1`
color: white;


`

const Health = styled.h1`
color: white;

`

const Inventory = styled.h1`
color: white;
margin-top: -20px;
margin-bottom: 40px;
`

const Chat = styled.div`
width: 18rem;
height: 14rem;
background: grey;
border-radius: 10px;
`

const ChatInput = styled.div`
width: 18rem;
height: 2rem;
background: darkgrey;
border-radius: 10px;
border-top: 1px solid black;
color: black;
padding: 5px;
margin-top: 5px;
`

const Message = styled.h1`
color: black;
font-size: 16px;
margin-left: 1rem;

`

class Sidebar extends React.Component {

render(){
    return (
        <>

            <StyledAside>
                <PlayerInfo>
                    <Username>Player15043</Username>
                    <MiniMap></MiniMap>
                    <Health>1020 HP</Health>
                    <Inventory>Inventory: Sword, Coins</Inventory>
                    <Chat>
                        <Message>Player15043: Hey Everyone!</Message>
                        <Message>Gamer376: Hello Player15043</Message>
                        <Message>Player15043: Come to the Foyer</Message>
                        <Message>D&D1997: How do I get there?</Message>
                        <Message>Player15043: North from the Xave Entrance</Message>
                        
                    </Chat>
                    <ChatInput>**Cave</ChatInput>    
                </PlayerInfo>
            </StyledAside>

        </>
        )
}}

export default Sidebar