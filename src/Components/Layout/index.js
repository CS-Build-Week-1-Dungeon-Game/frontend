import styled from "styled-components";
import * as mixins from "./mixins";

// COMPONENTS
export const GridChild = styled.div`
  ${mixins.gridChild}
`;

export const StyledFullPage = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0 2rem;
  width: 100%;
  height: 100vh;
  background: #212121;
`;
export { mixins };
