import React from "react";
import AppRouter from "../src/AppRouter";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
const theme = createMuiTheme({
  typography: {
    fontFamily:
      "'-apple-system','BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'"
  },
  palette: {
    type: "dark"
  }
});

//  "fontFamily": ""\"Roboto\", \"Helvetica\", \"Arial\", sans-serif"",
function App() {
  console.log(theme);
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline>
        <div className="App">
          <AppRouter />
        </div>
      </CssBaseline>
    </MuiThemeProvider>
  );
}

export default App;
