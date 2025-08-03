import { useEffect, useState } from 'react';
import Card from './cards.jsx';
import './GameBoard.css';
import { useNavigate } from 'react-router-dom';


import img1 from './images/briefcase.png';
import img2 from './images/crayons.png';
import img3 from './images/graduate.png';
import img4 from './images/graduate_1.png';
import img5 from './images/laptop.png';
import img6 from './images/paint_brushes.png';
import img7 from './images/pens.png';
import img8 from './images/professor.png';
import img9 from './images/student.png';
import img10 from './images/student_1.png';

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function GameBoard() {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matched, setMatched] = useState([]);
  const [turn, setTurn] = useState(1);
  const [scores, setScores] = useState({ 1: 0, 2: 0 });
  const [winner, setWinner] = useState(null);

  const navigate = useNavigate();


  const initializeGame = () => {
    const images = [
      { title: 'Briefcase', image: img1 },
      { title: 'Crayons', image: img2 },
      { title: 'Graduate girl', image: img3 },
      { title: 'Graduate boy', image: img4 },
      { title: 'Laptop', image: img5 },
      { title: 'Paint brushes', image: img6 },
      { title: 'Pens', image: img7 },
      { title: 'Professor', image: img8 },
      { title: 'Student girl', image: img9 },
      { title: 'Student boy', image: img10 },
    ];

    const duplicated = images.flatMap((img, index) => [
      { ...img, id: index * 2 },
      { ...img, id: index * 2 + 1 },
    ]);

    const shuffled = shuffle(duplicated);
    setCards(shuffled);
    setFlippedIndices([]);
    setMatched([]);
    setTurn(1);
    setScores({ 1: 0, 2: 0 });
    setWinner(null);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (index) => {
    if (flippedIndices.length === 2 || flippedIndices.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].title === cards[second].title) {
        setMatched((prev) => [...prev, first, second]);
        setScores((prev) => ({ ...prev, [turn]: prev[turn] + 1 }));
        setTimeout(() => setFlippedIndices([]), 1000);
      } else {
        setTimeout(() => {
          setFlippedIndices([]);
          setTurn(turn === 1 ? 2 : 1);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      const player1 = localStorage.getItem('player1Name') || 'Player 1';
      const player2 = localStorage.getItem('player2Name') || 'Player 2';

      const win =
        scores[1] > scores[2]
          ? player1
          : scores[2] > scores[1]
          ? player2
          : 'No one';

      setTimeout(() => {
        setWinner(win);
      }, 500);
    }
  }, [matched, cards, scores]);

  return (
    <div className={`game-board ${turn === 1 ? 'player1-turn' : 'player2-turn'}`}>
      <div className="scoreboard">
        <div className={`player ${turn === 1 ? 'active' : ''}`}>
          {localStorage.getItem('player1Name') || 'Player 1'} : {scores[1]}
        </div>
        <button className='btn' onClick={() => navigate('/Choose')}>Home</button>
        <div className={`player ${turn === 2 ? 'active' : ''}`}>
          {localStorage.getItem('player2Name') || 'Player 2'} : {scores[2]}
        </div>
      </div>

      <div className="card-grid">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            title={card.title}
            image={card.image}
            isFlipped={flippedIndices.includes(index) || matched.includes(index)}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>

      {winner && (
        <div className="modal">
          <div className="modal-content">
            <h2>{winner} wins!</h2>
            <button onClick={initializeGame}>Replay</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameBoard;
