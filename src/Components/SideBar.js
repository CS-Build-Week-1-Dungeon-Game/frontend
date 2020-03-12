import React from "react";
import styled from "styled-components";
import compass from "../assets/compass.png";

import ItemList from "./ItemList";
import Map from "./Map";

import { usePositionFinder } from "../hooks";

import { mixins } from "./Layout";

export default function Sidebar({
  player,
  roomIndex,
  clickHandler,
  playerColor
}) {
  let dimension = 30;
  let center = usePositionFinder(player, dimension, "#mini-map");
  return (
    <StyledAside
      imageUrl="http://avante.biz/wp-content/uploads/Brushed-Steel-Wallpapers/Brushed-Steel-Wallpapers-002.jpg"
      column="11/13"
      row="1/13"
      largeColumn="10/13"
      mediumColumn="9/13"
    >
      <PlayerInfo flexDirection="column">
        <Username>
          <JackImg src={compass} />
          {player.username}
        </Username>
        <MiniMap id="mini-map" raised="1.5rem" overflow="hidden">
          <Map
            hideName={true}
            center={center}
            roomIndex={roomIndex}
            dimension={dimension}
            player={player}
            playerColor={playerColor}
          />
        </MiniMap>
        <InventoryArea raised="1.5rem">
          <ItemList
            action="drop"
            itemTitle="Player Inventory"
            itemText="Click on an item to drop it"
            items={player.inventory}
            clickHandler={clickHandler}
          />
        </InventoryArea>
      </PlayerInfo>
    </StyledAside>
  );
}

const StyledAside = styled.aside`
  ${mixins.backgroundImage};
  ${mixins.gridChild};
  border-left: 2px solid black;
`;
const MiniMap = styled.div`
  width: 90%;
  height: 16rem;
  ${mixins.raisedEffect};
  color: #fafafa;
  position: relative;
  margin: 1rem auto;
`;
const PlayerInfo = styled.div`
  ${mixins.flexCenter}
  color: white;
`;
const Username = styled.h1`
  color: orange;
  ${mixins.flexCenter}
`;
const JackImg = styled.img`
  height: 2rem;
  margin-right: 1rem;
`;
const InventoryArea = styled.div`
  ${mixins.raisedEffect}
  text-align: center;
  max-width: 14rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;
