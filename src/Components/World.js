import React from "react";
import styled from "styled-components";

import Room from "./Room";
import Player from "./Player";
import ItemList from "./ItemList";
import Compass from "./Compass";

import { Typography } from "@material-ui/core";

import { gridParent, gridChild, backgroundImage } from "./styles";

export const StyledRooms = styled.div`
  background: transparent;
  position: relative;
  left: ${props => props.left && `${props.left}px`};
  top: ${props => props.top && `${props.top}px`};
  transition: left 0.3s, top 0.3s;
  transition-delay: 0.25s;
`;

const Container = styled.div`
  ${backgroundImage}
  ${gridParent};
  ${gridChild};
`;

const GridChild = styled.div`
  ${gridChild};
  position: relative;
  min-height: 0px;
  overflow: ${props => props.overflow || "auto"};
`;

const ScrollText = styled.div`
  overflow: auto;
  height: 200px;
  @media (max-width: 1200px) {
    height: 120px;
  }
  @media (max-width: 768px) {
    height: 75px;
  }
`;

class World extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: { x: null, y: null }
    };
  }

  componentDidMount() {
    const gameArea = document.querySelector("#game-area");
    let height = gameArea.offsetHeight;
    let width = gameArea.offsetWidth;
    if (this.props.playerRoom) {
      this.setState({
        center: {
          x: width / 2 - (this.props.playerRoom.x + this.props.dimension / 2),
          y: height / 2 - this.props.playerRoom.y - this.props.dimension / 2
        }
      });
    }
  }
  componentDidUpdate(prevProps) {
    const gameArea = document.querySelector("#game-area");
    let height = gameArea.offsetHeight;
    let width = gameArea.offsetWidth;
    if (
      this.props.playerRoom &&
      prevProps.playerRoom.title !== this.props.playerRoom.title
    ) {
      this.setState({
        center: {
          x: width / 2 - (this.props.playerRoom.x + this.props.dimension / 2),
          y: height / 2 - this.props.playerRoom.y - this.props.dimension / 2
        }
      });
    }
  }
  render() {
    return (
      <Container
        row="1/13"
        column="1/11"
        largeColumn="1/10"
        mediumColumn="1/9"
        imageUrl="https://wallpaperbro.com/img/509496.jpg"
      >
        <GridChild
          overflow="hidden"
          raised="1.5rem"
          id="game-area"
          row="2/8"
          column="2/8"
        >
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
        </GridChild>
        <GridChild raised="1.5rem" row="2/8" column="9/12">
          <ItemList
            itemTitle="Room Items"
            itemText="Click on an item to pick it up"
            items={this.props.roomItems}
            clickHandler={this.props.clickHandler}
          />
        </GridChild>
        <GridChild raised="1.5rem" row="9/12" column="2/8">
          <ScrollText>
            <Typography gutterBottom variant="h2" component="h4">
              You are at the {this.props.currentRoomTitle}
            </Typography>
            <Typography variant="body1">{this.props.currentDesc}</Typography>
          </ScrollText>
        </GridChild>
        <Compass move={this.props.move} />
      </Container>
    );
  }
}

export default World;
