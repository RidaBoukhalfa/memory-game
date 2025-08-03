import './Choose.css';
import { useNavigate } from 'react-router-dom';

function RandomMode() {
  const navigate = useNavigate();

  return (
    <div className="choose-container">
      <h2>Select Random Mode</h2>

      <button className='input' onClick={() => navigate('/RandomGame')}>
        🎲 Fully Random
      </button>

      <button className='input' onClick={() => navigate('/CustomRandom')}>
        ✏️ Custom Random
      </button>

      <button className='player' onClick={() => navigate('/Choose')}>
        ← Back
      </button>
    </div>
  );
}

export default RandomMode;
