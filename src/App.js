import React from 'react';

import {Route} from "react-router-dom"

import {WorldPage} from "./Components"

function App() {
  return (
    <div className="App">
      <Route path="/game-world" component={WorldPage}/>
    </div>
  );
}

export default App;
