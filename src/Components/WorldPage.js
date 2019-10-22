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

const WorldPage = () => {
    // the width/height of each room
    const dimension = 100
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
                roomDict[room.n_to].y = room.y - dimension
                recRoom(roomDict[room.n_to], roomDict)
            }
            if (room.s_to) {
                roomDict[room.s_to].x = room.x
                roomDict[room.s_to].y = room.y + dimension
                recRoom(roomDict[room.s_to], roomDict)
            }
            if (room.e_to) {
                roomDict[room.e_to].y = room.y
                roomDict[room.e_to].x = room.x + dimension
                recRoom(roomDict[room.e_to], roomDict)
            }
            if (room.w_to) {
                roomDict[room.w_to].y = room.y
                roomDict[room.w_to].x = room.x - dimension
                recRoom(roomDict[room.w_to], roomDict)
            }
        }
        recRoom(roomDict[Object.keys(roomDict)[0]], roomDict)
        
        return roomDict
    }
    const [rooms, setRooms] = useState(null)
    // for now I am just setting the first room to the first room we were sent, but it should be the room we initialize the character in
    const [currentRoom, setCurrentRoom] = useState(null)
    const [roomDict, setRoomDict] = useState(null)
    useEffect(() => {
        axios.get('https://lambda-mud-test.herokuapp.com/api/adv/rooms/')
        .then(res => {
            const roomDict = positionRooms(JSON.parse(res.data.rooms))
            setRoomDict(roomDict)
            const rooms = []
            for (let key in roomDict) {
                rooms.push(roomDict[key])
            }
            setCurrentRoom(rooms[0])
            setRooms(rooms)
        })
        .catch(err => console.log(err))
    }, [])
    const moveRooms = (e) => {
        setCurrentRoom(roomDict[Number(e.target.id)])
    }
    return (
        <StyledMain>
            <Menu></Menu>
            <World rooms={rooms} currentRoom={currentRoom} roomDict={roomDict} moveRooms={moveRooms} dimension={dimension}/>
            <Sidebar></Sidebar>
        </StyledMain>
    )
}

export default WorldPage