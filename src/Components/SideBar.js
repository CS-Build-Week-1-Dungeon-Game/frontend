import React from "react";
import styled from "styled-components";
import Jack from "../assets/jack.svg";

import ItemList from "./ItemList";
import Map from "./Map";

import { usePositionFinder } from "../hooks";

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

export default function Sidebar({
  player,
  roomIndex,
  clickHandler,
  playerColor
}) {
  let dimension = 30;
  let center = usePositionFinder(player, dimension, "#mini-map");
  return (
    <StyledAside>
      <PlayerInfo>
        <Username>
          <JackImg src={Jack} />
          {player.username}
        </Username>
        <MiniMap id="mini-map">
          <Map
            hideName={true}
            center={center}
            roomIndex={roomIndex}
            dimension={dimension}
            player={player}
            playerColor={playerColor}
          />
        </MiniMap>
        <InventoryArea>
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
