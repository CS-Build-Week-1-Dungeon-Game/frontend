import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Room from "./Room";
import Player from "./Player";
import ItemList from "./ItemList";
import Compass from "./Compass";
import Map from "./Map";

import { Typography, Paper } from "@material-ui/core";

import { mixins } from "./Layout";

export default function World({
  player,
  dimension,
  roomIndex,
  clickHandler,
  move
}) {
  let [center, setCenter] = useState({ x: null, y: null });

  useEffect(() => {
    const gameArea = document.querySelector("#game-area");
    let height = gameArea.offsetHeight;
    let width = gameArea.offsetWidth;
    if (player.room) {
      setCenter({
        x: width / 2 - (player.room.x * dimension + dimension / 2),
        y: height / 2 - (player.room.y * dimension + dimension / 2)
      });
    }
  }, [player.room, dimension]);
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
        <Map
          player={player}
          center={center}
          roomIndex={roomIndex}
          dimension={dimension}
        />
      </GridChild>
      <GridChild raised="1.5rem" row="2/8" column="9/12">
        <ItemList
          itemTitle="Room Items"
          itemText="Click on an item to pick it up"
          items={player.room.items}
          clickHandler={clickHandler}
        />
      </GridChild>
      {/* <GridChild flex raised="1.5rem" row="9/12" column="2/8">
        <ScrollText>
          <Typography gutterBottom variant="h2" component="h4">
            You are at the {this.currentRoomTitle}
          </Typography>
          <Typography variant="body1">{this.currentDesc}</Typography>
        </ScrollText>
      </GridChild> */}
      <Compass move={move} />
    </Container>
  );
}

export const StyledRooms = styled.div`
  background: transparent;
  position: relative;
  left: ${props => (props.left ? `${props.left}px` : 0)};
  top: ${props => !!props.top && `${props.top}px`};
  transition: left 0.3s, top 0.3s;
  transition-delay: 0.25s;
`;

const Container = styled.div`
  ${mixins.backgroundImage}
  ${mixins.gridParent};
  ${mixins.gridChild};
`;

const GridChild = styled.div`
  ${mixins.gridChild};
`;

const ScrollText = styled(Paper)`
  overflow: auto;
  height: 200px;
  @media (max-width: 1200px) {
    height: 120px;
  }
  @media (max-width: 768px) {
    height: 75px;
  }
`;

// export default World;
