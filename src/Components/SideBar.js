import React from 'react'
import styled from "styled-components"
import Player from "./Player"
import Room from "./Room"
import {positionRooms} from "../utils"

export const StyledRooms = styled.div`
    background: transparent;
    position: relative;
    left: ${props => props.left && `${props.left}px`};
    top: ${props => props.top && `${props.top}px`};
    transition: left 0.3s, top 0.3s;
    transition-delay: 0.5s;
`
const StyledAside = styled.aside`
background: #212121;
border-left: 2px solid white;
grid-column: 10 / span 3;
grid-row: 1 / span 12;
`

const MiniMap = styled.div`
width: 18rem;
height: 14rem;
background: black;
border-radius: 25px;
position: relative;
overflow: hidden;
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
    dimension = 30
    constructor(props) {
        super(props);
        this.state = {
            center: { x: null, y: null },
            rooms: [],
            roomDict: {},
            playerRoom: null
        }
    }
    componentDidMount() {
        // we have to get the positioned rooms with a new dimension!
        // iterate over the existing rooms and reset their x and y and isSet properties
        const roomDict = {}
        const rooms = JSON.parse(this.props.rawRooms)
        const miniMapRooms = positionRooms(rooms, this.dimension)
        for (let i = 0; i < miniMapRooms.length; i++) {
            roomDict[miniMapRooms[i].title] = miniMapRooms[i]
        }
        this.setState({rooms: miniMapRooms, roomDict})
        const gameArea = document.querySelector('#mini-map')
        let height = gameArea.offsetHeight;
        let width = gameArea.offsetWidth;
        let playerRoom = roomDict[this.props.playerRoom.title]
        if (playerRoom) {
            this.setState({ playerRoom: playerRoom, center: { x: (width / 2) -(playerRoom.x + this.dimension / 2), y: (height / 2) - playerRoom.y - this.dimension / 2 }})
        }
    }
    componentDidUpdate(prevProps) {
        const gameArea = document.querySelector('#mini-map')
        let height = gameArea.offsetHeight;
        let width = gameArea.offsetWidth;
        if (this.props.playerRoom && prevProps.playerRoom.title !== this.props.playerRoom.title) {
            console.log('here')
            const playerRoom = this.state.roomDict[this.props.playerRoom.title]
            this.setState({playerRoom, center: { x: (width / 2) - (playerRoom.x + this.dimension / 2), y: (height / 2) - playerRoom.y - this.dimension / 2}})
        }
    }
    render(){
        console.log(this.state)
        return (
            <>
                <StyledAside>
                    <PlayerInfo>
                        <Username>Player15043</Username>
                        <MiniMap id="mini-map">
                        <StyledRooms left={this.state.center.x} top={this.state.center.y}>
                            {this.state.playerRoom &&
                        <Player  dimension={this.dimension} playerRoom={this.state.playerRoom} user={this.props.user} hideName={true} playerColor={this.props.playerColor}/>}
                            {this.state.rooms && this.state.rooms.map(room => <Room room={room} key={room.pk} dimension={this.dimension} playerRoom={this.props.playerRoom}/>)}
                        </StyledRooms>

                        </MiniMap>
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