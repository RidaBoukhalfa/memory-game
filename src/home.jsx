import './home.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import memory from './memory.png';
import Swal from 'sweetalert2';

function Home() {
  const navigate = useNavigate();
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');

  const handleDone = () => {
    const isPlayer1Empty = player1Name.trim() === '';
    const isPlayer2Empty = player2Name.trim() === '';

    if (isPlayer1Empty || isPlayer2Empty) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Names!',
        text: 'Please enter names for both players.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    localStorage.setItem('player1Name', player1Name);
    localStorage.setItem('player2Name', player2Name);
    navigate('/Choose');
  };

  return (
    <div>
      <div className="home-container">
        <img className="home-image" src={memory} alt="Memory Game" />
        <h2 className="home-title">Memory Game</h2>
        <p className="home-description">Test your memory by matching pairs of cards!</p>

        <div className='players'>
          <input
            type="text"
            className="player-input"
            placeholder="Player 1 Name"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
          />
          <input
            type="text"
            className="player-input"
            placeholder="Player 2 Name"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
          />
        </div>

        <button className='home-button' onClick={handleDone}>Start Game</button>
      </div>
    </div>
  );
}

export default Home;
