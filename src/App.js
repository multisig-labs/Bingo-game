import React from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import GameDirections from './components/game-directions';
import Bingo from './components/bingo'; 
import BingoMessage from './components/bingo-message';
import Winner from './components/winner';
import './index.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} /> 
        <Route path="/game-directions" element={<GameDirections/>} />
        <Route path="/bingo" element={<Bingo/>} />
        <Route path="/bingo-message" element={<BingoMessage/>} />
        <Route path="/winner" element={<Winner />} />
      </Routes>
    </Router>
  );
};

export default App;
