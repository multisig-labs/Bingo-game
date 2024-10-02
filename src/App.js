import React from 'react';
import {ReactRouter as Router, Route, Switch} from 'react-router-dom';
import GameDirections from './components/game-directions';
import Bingo from './components/bingo'; 
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={GameDirections} />
        <Route path="/bingo" component={Bingo} />
      </Switch>
    </Router>
  );
};

export default App;
