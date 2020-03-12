import React from "react";
import AppRouter from "../src/AppRouter";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import styled from "styled-components";

const theme = createMuiTheme({
  typography: {
    fontFamily:
      "'-apple-system','BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'"
  },
  palette: {
    type: "dark"
  }
});

const StyledApp = styled.article`
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }
`;

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline>
        <StyledApp className="App">
          <AppRouter />
        </StyledApp>
      </CssBaseline>
    </MuiThemeProvider>
  );
}

export default App;
