import './cards.css';

function Card({ title, image, isFlipped, onClick }) {
  return (
    <div className="flip-card" onClick={onClick}>
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        <div className="flip-card-front">
          <p className="title">Dady Game</p>
        </div>
        <div className="flip-card-back">
          <p className="title">{title}</p>
          <img src={image} alt={title} />
        </div>
      </div>
    </div>
  );
}

export default Card;
