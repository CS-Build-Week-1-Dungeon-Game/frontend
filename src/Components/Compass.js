import React from "react";
import styled from "styled-components";
import compass from "../assets/compass.svg";
import { gridChild } from "./styles";

function Button({ move, direction, children }) {
  return (
    <StyledButton onClick={() => move(direction)}>{children}</StyledButton>
  );
}

export default function Compass({ move }) {
  return (
    <CompassBox
      flex
      flexDirection="column"
      raised="50%"
      row="9/12"
      column="9/12"
    >
      <Button move={move} direction="n">
        N
      </Button>

      <MiddleRow>
        <Button move={move} direction="w">
          W
        </Button>
        <CompassImg src={compass} alt="compass" />
        <Button move={move} direction="e">
          E
        </Button>
      </MiddleRow>

      <Button move={move} direction="s">
        S
      </Button>
    </CompassBox>
  );
}

const CompassBox = styled.div`
  ${gridChild};
`;

const CompassImg = styled.img`
  height: 4rem;
  margin: 10px;
`;

const MiddleRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledButton = styled.button`
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
