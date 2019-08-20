import React from "react";
import BookContainer from "./components/BookContainer";
import SavedBooks from "./components/SavedBooks";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return <Router>
  <div>
    
    <Switch>
      <Route exact path="/" component={BookContainer} />
      <Route exact path="/savedbooks" component={SavedBooks} />
      
    </Switch>
  </div>
</Router>
}

export default App;
