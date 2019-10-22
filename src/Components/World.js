import React, {useEffect, useState} from 'react'
import styled from "styled-components"
import axios from 'axios';
import Sidebar from './SideBar';
import compass from './compass.svg';

import Room from "./Room"

export const StyledRooms = styled.div`
    background: transparent;
    position: relative;
    left: ${props => props.left && `${props.left}px` };
    top: ${props => props.top && `${props.top}px` };
    transition: left 0.2s, top 0.2s;
`

// export const GameArea = styled.div`
    
//     grid-column: 2 / 9;
//     grid-row: 2 / 9;
//     position:relative;
    
// `

const Container = styled.div`
max-width: 960px;
`

const GameArea = styled.div`
background: grey;
grid-column: 2 / 9;
grid-row: 2 / 9;
width: 65rem;
height: 30rem;
margin-top: 1rem;
margin-left: 1rem;
border-radius: 25px;
overflow: hidden;
`

const Title = styled.h1`
width: 55rem;
margin-left: 2rem;
font-size: 39px;
color: white;
`

const WorldNav = styled.div`
display: flex;
`

const Desc = styled.header`
width: 55rem;
margin-left: 2rem;
font-size: 19px;
color: white;
`

const Compass = styled.img`
height: 4rem;
margin: 1rem;
`

const CompassBox = styled.div`
width: 14rem;
height: 14rem;
display: flex;
flex-direction: column;
align-items: center;
margin-top: 1rem;
margin-left: -3rem;
`

const MiddleRow = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`

const Button = styled.button`
background: black;
color: red;
border-radius: 25px;
border: 2px solid red;
outline: none;
:hover {
  color: green;
  cursor: pointer;
  border: 2px solid green;
}
`

const MapInfo = styled.div`
`


class World extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            center: {x: null, y: null},
    }
}
    
    componentDidMount() {
        const gameArea = document.querySelector('#game-area')
        let height = gameArea.offsetHeight;
        let width = gameArea.offsetWidth;
        if (this.props.playerRoom) {
            this.setState({center: {x: (width / 2) - (this.props.playerRoom.x + this.props.dimension / 2), y: (height / 2) - this.props.playerRoom.y - this.props.dimension / 2}})
        }
    }
    componentDidUpdate(prevProps) {
        const gameArea = document.querySelector('#game-area')
        let height = gameArea.offsetHeight;
        let width = gameArea.offsetWidth;
        if (this.props.playerRoom && prevProps.playerRoom.title !== this.props.playerRoom.title) {
            this.setState({center: {x: (width / 2) - (this.props.playerRoom.x + this.props.dimension / 2), y: (height / 2) - this.props.playerRoom.y - this.props.dimension / 2}})
        }
    }

    render(){
        return(
           <Container>
                    <GameArea id="game-area">
                        <StyledRooms left={this.state.center.x} top={this.state.center.y}>
                            {this.props.rooms && this.props.rooms.map(room => <Room room={room} key={room.pk}  dimension={this.props.dimension} playerRoom={this.props.playerRoom}/>)}
                        </StyledRooms>
                    </GameArea>
               <WorldNav>
                    <MapInfo>
                        <Title> You are at the {this.props.currentRoomTitle}</Title>     
                        <Desc>{this.props.currentDesc}</Desc>                        
                    </MapInfo> 

                    <CompassBox>
                        <Button type="button" onClick={() => this.props.move('n')}>North</Button>

                        <MiddleRow>
                            <Button type="button" onClick={() => this.props.move('w')}>West</Button>
                            <Compass src={compass} alt="compass" />
                            <Button type="button" onClick={() => this.props.move('e')}>East</Button>
                        </MiddleRow>

                        <Button type="button" onClick={() => this.props.move('s')}>South</Button>
                    </CompassBox>
                </WorldNav> 

            </Container>
        )
        
    }
};

export default World;

