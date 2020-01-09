import React from "react";
import styled from "styled-components";

const StyledRoom = styled.div.attrs(props => ({
  style: {
    height: props.dimension && `${props.dimension}px`,
    width: props.dimension && `${props.dimension}px`,
    left: props.x && `${props.x}px`,
    top: props.y && `${props.y}px`
  }
}))`
  border: 2px solid #3e2723;
  background: #2e7d32;
  position: absolute;
  & * {
    pointer-events: none;
  }
`;

const Door = styled.div.attrs(props => ({
  style: {
    left: props.left && `${props.left}px`,
    top: props.top && `${props.top}px`,
    width: props.dimension && `${props.width}px`,
    height: props.dimension && `${props.width}px`
  }
}))`
  position: absolute;
  background: #2e7d32;
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
        x={room.x * dimension}
        y={room.y * dimension}
        dimension={dimension}
        id={room.pk}
      ></StyledRoom>
    </>
  );
};

export default Room;
