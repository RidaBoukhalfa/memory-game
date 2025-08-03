import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './CustomRandom.css';

function CustomRandom() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    animals: 0,
    fruits: 0,
    flags: 0,
    school: 0,
    letters: 0
  });

  const handleChange = (category, value) => {
    const intVal = Math.min(10, Math.max(0, parseInt(value) || 0)); // Clamp between 0–10
    setValues((prev) => ({
      ...prev,
      [category]: intVal
    }));
  };

  const handleStartGame = () => {
    const total = Object.values(values).reduce((a, b) => a + b, 0);

    if (total < 10) {
      Swal.fire({
        icon: 'error',
        title: 'Not Enough Cards',
        text: 'Please select a total of 10 cards.',
      });
      return;
    }

    if (total > 10) {
      Swal.fire({
        icon: 'error',
        title: 'Too Many Cards',
        text: 'The total number of cards must not exceed 10.',
      });
      return;
    }

    navigate('/CustomGame', { state: values });
  };

  return (
    <div className="choose-containers">
      <h2 className='titles'>Choose how many cards per category</h2>

      {Object.keys(values).map((category) => (
        <div className='inputs' key={category}>
          <label className='category-label' style={{ marginRight: '10px' }}>{category.toUpperCase()}</label>
          <input
            className='inputField'
            type="number"
            min="0"
            max="10"
            value={values[category]}
            onChange={(e) => handleChange(category, e.target.value)}
            style={{ width: '60px' }}
          />
        </div>
      ))}

      <button className="btn_start" onClick={handleStartGame}>Start Game</button>
      <button className="back" onClick={() => navigate('/RandomMode')}>← Back</button>
    </div>
  );
}

export default CustomRandom;
