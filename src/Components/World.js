import React from 'react'
import styled from 'styled-components'
import compass from './compass.svg'

import Room from './Room'
import Player from './Player'

export const StyledRooms = styled.div`
  background: transparent;
  position: relative;
  left: ${props => props.left && `${props.left}px`};
  top: ${props => props.top && `${props.top}px`};
  transition: left 0.3s, top 0.3s;
  transition-delay: 0.5s;
`

const Container = styled.div`
background-image: url("https://wallpaperbro.com/img/509496.jpg");
background-size: cover;
height: 730px;
margin-bottom: -100px;
  grid-column: 1/ 10;
  grid-row: 1 / 12;
`

const GameArea = styled.div`
background-color: rgb(26, 26, 26, 0.85);
box-shadow: inset 3px 9px 25px -1px rgb(14, 14, 14);
border: 5px rgb(27, 27, 27, 0.85) inset;
border-radius: 1.5rem;
  width: 63%;
  height: 25rem;
  margin: 2rem;
  margin-left: 3rem;
  margin-bottom: 0rem;  

  overflow: hidden;

`

const Title = styled.h1`
  width: 55rem;
  margin-left: 2rem;
  font-size: 39px;
  color: grey;
`

const WorldNav = styled.div`
  display: flex;
  width: 90%;
  margin: auto;
`

const Desc = styled.header`
  margin-left: 2rem;
  font-size: 19px;
  color: grey;
`

const Compass = styled.img`
  height: 4rem;
  margin: 10px;
  
`

const CompassBox = styled.div`
background-color: rgb(26, 26, 26, 0.85);
box-shadow: inset 3px 9px 25px -1px rgb(14, 14, 14);
border: 5px rgb(27, 27, 27, 0.85) inset;
border-radius: 1.5rem;
width: 14rem;
height: 9rem;
display: flex;
flex-direction: column;
align-items: center;

margin: 1rem;
margin-top: 3rem;
`

const Username = styled.h1`
height: 4rem;
margin: 10px;
color: orange;
`

const UserPic = styled.img`
height: 4rem;
margin: 10px;
color: orange;
`

const MiddleRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Button = styled.button`
  width: 30px;
  height: 30px;

  color: red;
  border-radius: 25px;
  box-shadow: inset 3px 9px 50px -1px rgb(14, 14, 14);
border: 2px solid black;
  outline: none;
  :hover {
    color: green;
    cursor: pointer;
    box-shadow: inset 3px 9px 40px -1px rgb(14, 14, 14);
border: 2px solid black;
  }
`

const MapInfo = styled.div`
background-color: rgb(26, 26, 26, 0.85);
box-shadow: inset 3px 9px 25px -1px rgb(14, 14, 14);
border: 5px rgb(27, 27, 27, 0.85) inset;
border-radius: 1.5rem;
  width: 70%;
  height: 15rem;
  margin-top: 2rem;
`

class World extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      center: { x: null, y: null },
    }
  }

  componentDidMount() {
    const gameArea = document.querySelector('#game-area')
    let height = gameArea.offsetHeight
    let width = gameArea.offsetWidth
    if (this.props.playerRoom) {
      this.setState({
        center: {
          x: width / 2 - (this.props.playerRoom.x + this.props.dimension / 2),
          y: height / 2 - this.props.playerRoom.y - this.props.dimension / 2,
        },
      })
    }
  }
  componentDidUpdate(prevProps) {
    const gameArea = document.querySelector('#game-area')
    let height = gameArea.offsetHeight
    let width = gameArea.offsetWidth
    if (
      this.props.playerRoom &&
      prevProps.playerRoom.title !== this.props.playerRoom.title
    ) {
      this.setState({
        center: {
          x: width / 2 - (this.props.playerRoom.x + this.props.dimension / 2),
          y: height / 2 - this.props.playerRoom.y - this.props.dimension / 2,
        },
      })
    }
  }

  render() {
    return (
      <Container>
        <GameArea id="game-area">
          <StyledRooms left={this.state.center.x} top={this.state.center.y}>
            <Player
              dimension={this.props.dimension}
              playerRoom={this.props.playerRoom}
              user={this.props.user}
              playerColor={this.props.playerColor}
            />
            {this.props.rooms &&
              this.props.rooms.map(room => (
                <Room
                  room={room}
                  key={room.pk}
                  dimension={this.props.dimension}
                  playerRoom={this.props.playerRoom}
                />
              ))}
          </StyledRooms>
        </GameArea>
        <WorldNav>
          <MapInfo>
            <Title> You are at the {this.props.currentRoomTitle}</Title>
            <Desc>{this.props.currentDesc}</Desc>
          </MapInfo>

          <CompassBox>
            <Button type="button" onClick={() => this.props.move('n')}>
              N
            </Button>

            <MiddleRow>
              <Button type="button" onClick={() => this.props.move('w')}>
                W
              </Button>
              <Compass src={compass} alt="compass" />
              <Button type="button" onClick={() => this.props.move('e')}>
                E
              </Button>
            </MiddleRow>

            <Button type="button" onClick={() => this.props.move('s')}>
              S
            </Button>
          </CompassBox>
        </WorldNav>
      </Container>
    )
  }
}

export default World
