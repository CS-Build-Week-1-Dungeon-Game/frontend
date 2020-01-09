import React from "react";
import styled from "styled-components";

const StyledRoom = styled.div`
  border: 2px solid #3e2723;
  background: ${props => (props.red ? "red" : "#2e7d32")};
  height: ${props => props.dimension && `${props.dimension}px`};
  width: ${props => props.dimension && `${props.dimension}px`};
  position: absolute;
  left: ${props => props.x && `${props.x}px`};
  top: ${props => props.y && `${props.y}px`};
  & * {
    pointer-events: none;
  }
`;
const Door = styled.div`
    position: absolute;
    background: #2e7d32;
    left: ${props => props.left && `${props.left}px`};
    top: ${props => props.top && `${props.top}px`}
    width: ${props => props.dimension && `${props.width}px`};
    height: ${props => props.dimension && `${props.width}px`};
    z-index: 998;
`;

const Room = ({ room, player, dimension, red }) => {
  const doorWidth = dimension / 4;
  return (
    <>
      {!!room.n_to && (
        <Door
          left={room.x * dimension + (dimension / 2 - doorWidth / 2)}
          top={room.y * dimension - doorWidth / 2}
          dimension={dimension}
          width={doorWidth}
        />
      )}
      {!!room.w_to && (
        <Door
          left={room.x * dimension - doorWidth / 2}
          top={room.y * dimension + (dimension / 2 - doorWidth / 2)}
          dimension={dimension}
          width={doorWidth}
        />
      )}
      <StyledRoom
        red={red}
        x={room.x * dimension}
        y={room.y * dimension}
        dimension={dimension}
        id={room.pk}
      ></StyledRoom>
    </>
  );
};

export default Room;
