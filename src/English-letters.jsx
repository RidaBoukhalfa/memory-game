import { useEffect, useState } from 'react';
import Card from './cards.jsx';
import { useNavigate } from 'react-router-dom';


// Dynamically import all images from the images folder (Vite/modern bundlers)
const imageModules = import.meta.glob('./EnglishLetters/*.{png,jpg,jpeg,webp}', { eager: true });

const images = Object.entries(imageModules).map(([path, module]) => {
  const fileName = path.replace('./EnglishLetters/', '').replace(/\.(png|jpe?g|webp)$/, '');
  const formattedTitle = fileName.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: formattedTitle,
    image: module.default,
  };
});

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function EnglishLetters() {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matched, setMatched] = useState([]);
  const [turn, setTurn] = useState(1);
  const [scores, setScores] = useState({ 1: 0, 2: 0 });
  const [winner, setWinner] = useState(null);

  const navigate = useNavigate();


  const initializeGame = () => {
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
    if (
      flippedIndices.length === 2 ||
      flippedIndices.includes(index) ||
      matched.includes(index)
    )
      return;

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

export default EnglishLetters;
