import styled from "styled-components";
import { css } from "styled-components";

// colors
export const solidDark = `rgb(14, 14, 14)`;
export const translucentDark = `rgb(26, 26, 26, 0.85)`;

// sizes
export const small = "480px";
export const medium = "768px";
export const large = "1200px";

// mixins
export const gridParent = css`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
`;

export const gridChild = css`
  ${props => props.raised && raisedEffect}
  grid-column: ${props => props.column};
  grid-row: ${props => props.row};
  @media (max-width: ${large}) {
    grid-column: ${props => props.largeColumn || ""};
    grid-row: ${props => props.largeRow || ""};
  }
  @media (max-width: ${medium}) {
    grid-column: ${props => props.mediumColumn || ""};
    grid-row: ${props => props.mediumRow || ""};
  }
  @media (max-width: ${small}) {
    grid-column: ${props => props.smallColumn || ""};
    grid-row: ${props => props.smallRow || ""};
  }
`;

export const backgroundImage = css`
  background-image: url ${props => props.imageUrl};
  background-size: cover;
  background-repeat: no-repeat;
`;

export const raisedEffect = css`
  background-color: ${translucentDark};
  box-shadow: inset 3px 9px 25px -1px ${solidDark};
  border: 5px ${translucentDark} inset;
  border-radius: ${props => props.raised};
`;

// components
export const FlexDiv = styled.div`
  display: flex;
`;

export const FlexCenterDiv = styled(FlexDiv)`
  align-items: center;
  justify-content: center;
`;
