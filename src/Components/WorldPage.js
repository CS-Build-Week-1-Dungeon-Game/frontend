import React, {useState, useEffect} from "react"

import axios from "axios"

import styled from "styled-components"

import Menu from './Menu'
import Sidebar from "./SideBar"
import World from "./World"

import {positionRooms} from "../utils"

export const StyledMain = styled.main`
    margin: 0;
    min-height: 100vh;
    display: grid;

    background: black;
    position: relative;
`

class WorldPage extends React.Component {
    dimension = 100
    constructor() {
        super();
        this.state = {
            playerRoom: null,
            currentRoomTitle: "",
            currentDesc: "",
            rooms: null,
            roomDict: null
        }
    }
    componentDidMount() {
        this.start();
        axios
            .get(`https://mud-cs22.herokuapp.com/api/adv/rooms/`)
            .then(res => {
                const rooms = positionRooms(JSON.parse(res.data.rooms), this.dimension)
                const roomDict = {}
                for (let i = 0; i < rooms.length; i++) {
                    roomDict[rooms[i].title] = rooms[i]
                }
                this.setState({...this.state, rooms:rooms, roomDict:roomDict
                })})
            .catch(err => console.log(err))
        
        
    }

    start = () => {
        const token = localStorage.getItem('token'); 
        axios({
            url: `https://mud-cs22.herokuapp.com/api/adv/init/`,
            method: "GET",
            headers: {
                Authorization: token
            }
        })
            .then(res => {
                let currentRoom = this.state.rooms.find(room => room.title === res.data.title)
                this.setState({ 
                    currentRoomTitle: res.data.title,
                    userID: res.data.uuid,
                    currentDesc: res.data.description,
                    playerRoom: currentRoom
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
            url: `https://mud-cs22.herokuapp.com/api/adv/move`,
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
                    playerRoom: this.state.roomDict[res.data.title]
                })
            })
            .catch(err => {
                console.log('errors', err.response)
            });
    };
    render(){

    return (
        <StyledMain>
            <Menu></Menu>
            {(this.state.rooms && this.state.currentRoomTitle) && <World rooms={this.state.rooms} playerRoom={this.state.playerRoom} move={this.move} dimension={this.dimension} currentRoomTitle={this.state.currentRoomTitle}
            currentDesc={this.state.currentDesc}/>}
            <Sidebar></Sidebar>
        </StyledMain>
    )

}}


export default WorldPage