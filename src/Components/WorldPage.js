import React from "react"

import axios from "axios"

import styled from "styled-components"

import Menu from './Menu'
import Sidebar from "./SideBar"
import World from "./World"
import FullPageLoader from "./FullPageLoader"

import { positionRooms } from "../utils"

export const StyledMain = styled.main`
    margin: 0;
    min-height: 100vh;
    display: grid;
    background: black;
    position: relative;
    grid-template-columns: repeat(12, 1fr);
    grid-template-columns: repeat(12, 1fr);
`

class WorldPage extends React.Component {
    dimension = 150
    constructor() {
        super();
        this.state = {
            playerRoom: null,
            currentRoomTitle: "",
            currentDesc: "",
            rooms: null,
            roomDict: null,
            user: null
        }
    }
    componentDidMount() {
        this.start();
    }

    start = () => {
        // Get and parse the rooms
        axios
            .get(`https://mud-cs22.herokuapp.com/api/adv/rooms/`)
            .then(res => {
                const rooms = positionRooms(JSON.parse(res.data), this.dimension)
                const roomDict = {}
                for (let i = 0; i < rooms.length; i++) {
                    roomDict[rooms[i].title] = rooms[i]
                }
                this.setState({
                    ...this.state, rooms: rooms, roomDict: roomDict
                })
            })
            .catch(err => console.log(err))

        // initialize the player
        const token = localStorage.getItem('token');
        axios({
            url: `https://mud-cs22.herokuapp.com/api/adv/init/`,
            method: "GET",
            headers: {
                Authorization: token
            }
        })
            .then(res => {
                let currentRoom = this.state.roomDict[res.data.title]
                this.setState({
                    currentRoomTitle: res.data.title,
                    userID: res.data.uuid,
                    currentDesc: res.data.description,
                    playerRoom: currentRoom,
                    user: res.data.name
                });

            })
            .catch(err => {
                console.log(err)
            });
    };

    move = (direction) => {
        const directions = { 'n': 'n_to', 's': 's_to', 'e': 'e_to', 'w': 'w_to' }
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
    render() {
        if (!this.state.rooms || !this.state.currentRoomTitle) {
            return <FullPageLoader />
        }
        return (
            <StyledMain>
                <Menu></Menu>
                <World rooms={this.state.rooms} playerRoom={this.state.playerRoom} move={this.move} dimension={this.dimension} currentRoomTitle={this.state.currentRoomTitle}
                    currentDesc={this.state.currentDesc} user={this.state.user}/>}
            <Sidebar></Sidebar>
            </StyledMain>
        )

    }
}


export default WorldPage