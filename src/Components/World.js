import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Sidebar from './SideBar';
import compass from './compass.svg';


const Container = styled.div`
max-width: 960px;
`

const GameArea = styled.div`
background: white;
grid-column: 2 / 9;
grid-row: 2 / 9;
width: 65rem;
height: 30rem;
margin-top: 1rem;
margin-left: 1rem;
border-radius: 25px;
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
    constructor() {
        super();
        this.state = {
            playerRoom: null,
            currentRoomTitle: "",
            currentDesc: "",
            rooms: null,
    }
}
    
    componentDidMount() {

        this.start();
        this.move('s')

        axios
            .get(`https://lambda-mud-test.herokuapp.com/api/rooms/`)
            .then(res => this.setState({...this.state, rooms:res.data, playerRoom:res.data[100]}))
            .catch(err => console.log(err))
        
        
    }

    start = () => {
        const token = localStorage.getItem('token'); 
        axios({
            url: `https://lambda-mud-test.herokuapp.com/api/adv/init/`,
            
            method: "GET",
            headers: {
                Authorization: token
            }
        })
            .then(res => {
                this.setState({ 
                    currentRoomTitle: res.data.title,
                    userID: res.data.uuid,
                    currentDesc: res.data.description,
                    
                }); 

            })
            .catch(err => {
                console.log('errors', err.response)
            });        
    };

    move = (direction) => {

        const directions={'n':'n_to', 's':'s_to', 'e':'e_to', 'w':'w_to'}

        const token = localStorage.getItem('token'); 
        axios({
            url: `https://lambda-mud-test.herokuapp.com/api/adv/move`,
            method: "POST",
            headers: {
                Authorization: token
            },
            data: {
                direction: direction
            }
        })
            .then(res => {
                this.setState({
                    currentRoomTitle: res.data.title,
                    currentDesc: res.data.description,
                })
                console.log(this.state.playerRoom)
                let formattedDirection = directions[direction]
                console.log(formattedDirection)
                console.log(": ", this.state.playerRoom[formattedDirection])
                let nextRoomId = this.state.playerRoom[formattedDirection]
                if( nextRoomId !== 0) {

                    let nextRoom = this.state.rooms.find(room => room.id === nextRoomId)
                    console.log(nextRoom)
                    this.setState({...this.state, playerRoom: nextRoom})

                }

            })
            .catch(err => {
                console.log('errors', err.response)
            });
    };

    render(){

        
       
        return(
           <Container>
                    <GameArea ></GameArea>
               <WorldNav>
               
                    <MapInfo>
                        
                        <Title> You are at the {this.state.currentRoomTitle}</Title>     
                        <Desc>{this.state.currentDesc}</Desc>                        
                    </MapInfo> 

                    <CompassBox>
                        <Button type="button" onClick={() => this.move('n')}>North</Button>

                        <MiddleRow>
                            <Button type="button" onClick={() => this.move('w')}>West</Button>
                            <Compass src={compass} alt="compass" />
                            <Button type="button" onClick={() => this.move('e')}>East</Button>
                        </MiddleRow>


                        <Button type="button" onClick={() => this.move('s')}>South</Button>
                    </CompassBox>
                </WorldNav> 

            </Container>
        )
        
    }
};

export default World;

