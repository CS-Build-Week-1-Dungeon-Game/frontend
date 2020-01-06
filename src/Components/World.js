import React from "react";
import styled from "styled-components";
import compass from "../assets/compass.svg";

import Room from "./Room";
import Player from "./Player";
import ItemList from "./ItemList";

import { gridParent, gridChild, raisedEffect } from "./styles";

export const StyledRooms = styled.div`
  background: transparent;
  position: relative;
  left: ${props => props.left && `${props.left}px`};
  top: ${props => props.top && `${props.top}px`};
  transition: left 0.3s, top 0.3s;
  transition-delay: 0.25s;
`;

const Container = styled.div`
  background-image: url("https://wallpaperbro.com/img/509496.jpg");
  ${gridParent};
  background-size: cover;
  ${gridChild};
`;

const GameArea = styled.div`
  ${gridChild};
  overflow: hidden;
`;

const Title = styled.h1`
  margin-left: 2rem;
  font-size: 39px;
  color: grey;
`;
const ItemDiv = styled.div`
  ${gridChild}
`;
const WorldNav = styled.div`
  ${gridChild};
  overflow: auto;
`;

const Desc = styled.header`
  // margin-left: 2rem;
  // font-size: 19px;
  // color: grey;
`;

const Compass = styled.img`
  height: 4rem;
  margin: 10px;
`;

const CompassBox = styled.div`
  ${gridChild};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MiddleRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

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
`;

const ItemTitle = styled.h1`
  // color: white;
`;
const ItemText = styled.p`
  // color: white;
  // font-size: 1.2rem;
  // text-align: center;
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
      <Container row="1/13" column="1/11" largeColumn="1/10" mediumColumn="1/9">
        <GameArea raised="1.5rem" id="game-area" row="2/8" column="2/8">
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
        <ItemDiv raised="1.5rem" row="2/8" column="9/12">
          <ItemList
            items={this.props.roomItems}
            clickHandler={this.props.clickHandler}
          />
        </ItemDiv>
        <WorldNav raised="1.5rem" row="9/12" column="2/8">
          <Title> You are at the {this.props.currentRoomTitle}</Title>
          <Desc>{this.props.currentDesc}</Desc>
        </WorldNav>
        <CompassBox raised="50%" row="9/12" column="9/12">
          <Button type="button" onClick={() => this.props.move("n")}>
            N
          </Button>

          <MiddleRow>
            <Button type="button" onClick={() => this.props.move("w")}>
              W
            </Button>
            <Compass src={compass} alt="compass" />
            <Button type="button" onClick={() => this.props.move("e")}>
              E
            </Button>
          </MiddleRow>

          <Button type="button" onClick={() => this.props.move("s")}>
            S
          </Button>
        </CompassBox>
      </Container>
    );
  }
}

export default World;
