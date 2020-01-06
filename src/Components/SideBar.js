import React from "react";
import styled from "styled-components";
import Player from "./Player";
import Room from "./Room";
import { positionRooms } from "../utils";
import Jack from "../assets/jack.svg";
import ItemList from "./ItemList";

export const StyledRooms = styled.div`
  position: relative;
  left: ${props => props.left && `${props.left}px`};
  top: ${props => props.top && `${props.top}px`};
  transition: left 0.3s, top 0.3s;
  transition-delay: 0.5s;
`;
const StyledAside = styled.aside`
  background-image: url("http://avante.biz/wp-content/uploads/Brushed-Steel-Wallpapers/Brushed-Steel-Wallpapers-002.jpg");
  background-size: cover;
  border-left: 2px solid black;
  grid-column: 11 / 13;
  grid-row: 1 / 13;
  @media (max-width: 1200px) {
    grid-column: 10 / 13;
  }
  @media (max-width: 768px) {
    grid-column: 9 / 13;
  }
`;
const MiniMap = styled.div`
  width: 90%;
  height: 16rem;
  background-color: rgb(26, 26, 26, 0.85);
  border: 5px rgb(27, 27, 27, 0.85) inset;
  border-radius: 1.5rem;
  box-shadow: inset 3px 9px 25px -1px rgb(14, 14, 14);
  color: #fafafa;
  position: relative;
  overflow: hidden;
  margin: 1rem auto;
`;
const PlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;
const Username = styled.h1`
  color: orange;
  display: flex;
  align-items: center;
  margin-left: -2rem;
`;
const Health = styled.h1`
  color: white;
`;
const Inventory = styled.h1`
  color: white;
`;
const JackImg = styled.img`
  height: 2rem;
  margin-right: 1rem;
`;
const InventoryArea = styled.div`
  background-color: rgb(26, 26, 26, 0.85);
  border: 5px rgb(27, 27, 27, 0.85) inset;
  border-radius: 1.5rem;
  box-shadow: inset 3px 9px 25px -1px rgb(14, 14, 14);
  text-align: center;
  max-width: 14rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;
const InventoryText = styled.p`
  font-size: 1.2rem;
  margin-top: 0.5rem;
  height: 1rem;
  margin-right: 1rem;
  max-height: 1rem;
`;

class Sidebar extends React.Component {
  dimension = 30;
  constructor(props) {
    super(props);
    this.state = {
      center: { x: null, y: null },
      rooms: [],
      roomDict: {},
      playerRoom: null
    };
  }
  componentDidMount() {
    // we have to get the positioned rooms with a new dimension!
    // iterate over the existing rooms and reset their x and y and isSet properties
    const roomDict = {};
    const rooms = JSON.parse(this.props.rawRooms);
    const miniMapRooms = positionRooms(rooms, this.dimension);
    for (let i = 0; i < miniMapRooms.length; i++) {
      roomDict[miniMapRooms[i].title] = miniMapRooms[i];
    }
    this.setState({ rooms: miniMapRooms, roomDict });
    const gameArea = document.querySelector("#mini-map");
    let height = gameArea.offsetHeight;
    let width = gameArea.offsetWidth;
    let playerRoom = roomDict[this.props.playerRoom.title];
    if (playerRoom) {
      this.setState({
        playerRoom: playerRoom,
        center: {
          x: width / 2 - (playerRoom.x + this.dimension / 2),
          y: height / 2 - playerRoom.y - this.dimension / 2
        }
      });
    }
  }
  componentDidUpdate(prevProps) {
    const gameArea = document.querySelector("#mini-map");
    let height = gameArea.offsetHeight;
    let width = gameArea.offsetWidth;
    if (
      this.props.playerRoom &&
      prevProps.playerRoom.title !== this.props.playerRoom.title
    ) {
      const playerRoom = this.state.roomDict[this.props.playerRoom.title];
      this.setState({
        playerRoom,
        center: {
          x: width / 2 - (playerRoom.x + this.dimension / 2),
          y: height / 2 - playerRoom.y - this.dimension / 2
        }
      });
    }
  }
  render() {
    return (
      <>
        <StyledAside>
          <PlayerInfo>
            <Username>
              <JackImg src={Jack} />
              {this.props.user}
            </Username>
            <MiniMap id="mini-map">
              <StyledRooms left={this.state.center.x} top={this.state.center.y}>
                {this.state.playerRoom && (
                  <Player
                    dimension={this.dimension}
                    playerRoom={this.state.playerRoom}
                    user={this.props.user}
                    hideName={true}
                    playerColor={this.props.playerColor}
                  />
                )}
                {this.state.rooms &&
                  this.state.rooms.map(room => (
                    <Room
                      room={room}
                      key={room.pk}
                      dimension={this.dimension}
                      playerRoom={this.props.playerRoom}
                    />
                  ))}
              </StyledRooms>
            </MiniMap>

            <InventoryArea>
              Inventory
              {/* {this.props.playerInventory && this.props.playerInventory.map(item => 
                <InventoryItem key={item}>{item}</InventoryItem>
            )} */}
              <ItemList
                items={this.props.playerInventory}
                clickHandler={this.props.clickHandler}
              />
              <InventoryText>Click item to drop</InventoryText>
            </InventoryArea>
          </PlayerInfo>
        </StyledAside>
      </>
    );
  }
}

export default Sidebar;
