import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import './index.css'
import Home from './Home.jsx'
import GameBoard from './GameBoard.jsx'
import Vs from './vs.jsx'
import Choose from './Choose.jsx';
import Animals from './Animals.jsx';
import Fruits from './Fruits.jsx';
import Flags from './Flags.jsx';
import EnglishLetters from './English-letters.jsx';
import Random from './Random.jsx';
import RandomGame from './RandomMode.jsx';
import CustomGame from './CustomGame.jsx';
import CustomRandom from './CustomRandom.jsx';

function App() {


  return (
    <BrowserRouter basename="/memory-game">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vs" element={<Vs />} />
        <Route path="/GameBoard" element={<GameBoard />} />
        <Route path="/Choose" element={<Choose />} />
        <Route path="/Animals" element={<Animals />} />
        <Route path="/Fruits" element={<Fruits />} />
        <Route path="/Flags" element={<Flags />} />
        <Route path="/English-letters" element={<EnglishLetters />} />
        <Route path="/Random" element={<Random />} />
        <Route path="/RandomGame" element={<RandomGame />} />
        <Route path="/CustomGame" element={<CustomGame />} />
        <Route path="/CustomRandom" element={<CustomRandom />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
