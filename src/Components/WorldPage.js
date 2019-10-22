import React from "react"

import axios from "axios"
import styled from "styled-components"

import Menu from './Menu'
import Sidebar from "./SideBar"
import World from "./World"

export const StyledMain = styled.main`
    margin: 0;
    min-height: 100vh;
    display: grid;

    background: black;
`

class WorldPage extends React.Component {
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

    return (
        <StyledMain>
            <Menu></Menu>
            <World />
            <Sidebar></Sidebar>
        </StyledMain>
    )

}}


export default WorldPage