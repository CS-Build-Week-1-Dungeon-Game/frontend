import React from "react";
import styled from "styled-components";

import { Paper, Typography } from "@material-ui/core";

import { StyledFullPage, mixins } from "./Layout";
import castleInside from "../assets/castle-inside.jpg";

const NoMobile = () => {
  return (
    <StyledNoMobile imageUrl={castleInside}>
      <StyledPaper>
        <Typography variant="h4" component="h4">
          We're sorry, this app isn't ready for mobile yet, but check back soon!
        </Typography>
      </StyledPaper>
    </StyledNoMobile>
  );
};

export default NoMobile;

export const StyledNoMobile = styled(StyledFullPage)`
  ${mixins.backgroundImage};
`;
export const StyledPaper = styled(Paper)`
  padding: 1rem;
`;
