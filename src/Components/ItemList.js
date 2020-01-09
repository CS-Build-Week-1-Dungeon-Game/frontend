import React from "react";
import styled from "styled-components";

import { List, ListItem, ListItemText } from "@material-ui/core";

import { uuid } from "uuidv4";

const StyledList = styled(List)`
  width: 100%;
  background-color: grey;
  position: relative;
  overflow: auto;
  max-height: 250px;
`;

const StyledUl = styled.ul`
  background-color: inherit;
  padding: 0;
`;

const StyledLi = styled(ListItem)`
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #2e7d32;
  }
`;

export default function ItemList(props) {
  return (
    <>
      <h2>{props.itemTitle}</h2>
      <StyledList>
        <StyledUl>
          {props.items.map(item => (
            <StyledLi
              key={uuid()}
              onClick={e => props.clickHandler(e, props.action)}
            >
              <ListItemText primary={`${item}`} />
            </StyledLi>
          ))}
        </StyledUl>
      </StyledList>
      <p>{props.itemText}</p>
    </>
  );
}
