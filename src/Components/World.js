import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Room from "./Room";
import Player from "./Player";
import ItemList from "./ItemList";
import Compass from "./Compass";
import Map from "./Map";

import { Typography, Paper } from "@material-ui/core";

import { mixins } from "./Layout";

import { usePositionFinder } from "../hooks";

export default function World({
  player,
  dimension,
  roomIndex,
  clickHandler,
  move,
  playerColor
}) {
  let center = usePositionFinder(player, dimension, "#game-area");
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
          hideName={false}
          player={player}
          center={center}
          roomIndex={roomIndex}
          dimension={dimension}
          playerColor={playerColor}
        />
      </GridChild>
      <GridChild raised="1.5rem" row="2/8" column="9/12">
        <ItemList
          action="take"
          itemTitle="Room Items"
          itemText="Click on an item to pick it up"
          items={player.room.items}
          clickHandler={clickHandler}
        />
      </GridChild>
      <GridChild flex raised="1.5rem" row="9/12" column="2/8">
        <ScrollText>
          <Typography gutterBottom variant="h2" component="h4">
            You are at the {player.room.title}
          </Typography>
          <Typography variant="body1">{player.room.description}</Typography>
        </ScrollText>
      </GridChild>
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
