import React from 'react'
import styled from 'styled-components'

const RoomStyle = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 10%;
height: 100%;
border: 1px solid yellow;
`

const Player = styled.div`
width: 15px;
height: 15px;
border-radius: 50%;
background: red;
display: inline-block;
`

class Room extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasPlayer: false,
        }
    }


    render() {
        return(
            <RoomStyle>
                
                {
                    this.props.playerRoom && this.props.room &&
                    this.props.playerRoom.id === this.props.room.id &&
                    <Player></Player>
                }

            </RoomStyle>
        )
    }
}

export default Room