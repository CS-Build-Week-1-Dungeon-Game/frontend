import React, {useState, useEffect} from "react"

import axios from "axios"

import styled from "styled-components"

import Menu from './Menu'
import Sidebar from "./SideBar"
import World from "./World"

export const StyledMain = styled.main`
    margin: 0;
    min-height: 100vh;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(12, 1fr);
    background: black;
    position: relative;
`

const positionRooms = (rooms) => {
    const roomDict = {}
    // load our array of rooms into a much more usable dictionary
    for (let i = 0; i < rooms.length; i++) {
        roomDict[rooms[i].pk] = {...rooms[i].fields, pk: rooms[i].pk, x:0, y:0, isSet: false}
    }
    const recRoom = (room, roomDict) => {
        if (room.isSet) {
            return
        }
        room.isSet = true
        if (room.n_to) {
            roomDict[room.n_to].x = room.x
            roomDict[room.n_to].y = room.y - 1
            recRoom(roomDict[room.n_to], roomDict)
        }
        if (room.s_to) {
            roomDict[room.s_to].x = room.x
            roomDict[room.s_to].y = room.y + 1
            recRoom(roomDict[room.s_to], roomDict)
        }
        if (room.e_to) {
            roomDict[room.e_to].y = room.y
            roomDict[room.e_to].x = room.x + 1
            recRoom(roomDict[room.e_to], roomDict)
        }
        if (room.w_to) {
            roomDict[room.w_to].y = room.y
            roomDict[room.w_to].x = room.x - 1
            recRoom(roomDict[room.w_to], roomDict)
        }
    }
    recRoom(roomDict[Object.keys(roomDict)[0]], roomDict)
    const roomArr = []
    for (let key in roomDict) {
        roomArr.push(roomDict[key])
    }
    return roomArr
}

const WorldPage = () => {
    const [rooms, setRooms] = useState(null)
    useEffect(() => {
        axios.get('https://lambda-mud-test.herokuapp.com/api/adv/rooms/')
        .then(res => {
            setRooms(positionRooms(JSON.parse(res.data.rooms)))
        })
        .catch(err => console.log(err))
    }, [])
    return (
        <StyledMain>
            <Menu></Menu>
            <World rooms={rooms}/>
            <Sidebar></Sidebar>
        </StyledMain>
    )
}

export default WorldPage