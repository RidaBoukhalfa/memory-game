import './Choose.css';
import { useNavigate } from 'react-router-dom';
import schoolIcon from './icons/school.png'
import lettersIcon from './icons/alphabet.png';
import flagsIcon from './icons/earth.png';
import fruitsIcon from './icons/fruit.png';
import animalsIcon from './icons/livestock.png';
import dice from './dice.png';

function Choose() {
    const navigate = useNavigate();

    return (

        <div className="choose-container">

            <button className='player' onClick={() => navigate('/')}>Change the names</button>

            <button className='input' onClick={() => navigate('/GameBoard')}>
                <img src={schoolIcon} alt="School" className="icon" />
                School
            </button>
            <button className='input' onClick={() => navigate('/Animals')}>
                <img src={animalsIcon} alt="Animals" className="icon" />
                Animals
            </button>
            <button className='input' onClick={() => navigate('/Fruits')}>
                <img src={fruitsIcon} alt="Fruits" className="icon" />
                Fruits
            </button>
            <button className='input' onClick={() => navigate('/Flags')}>
                <img src={flagsIcon} alt="Flags" className="icon" />
                Flags
            </button>
            <button className='input' onClick={() => navigate('/English-letters')}>
                <img src={lettersIcon} alt="English Letters" className="icon" />
                English Letters
            </button>
            <button className='random' onClick={() => navigate('/Random')}>
                <img src={dice} alt="Random" className="icon" />
                Random
            </button>
        </div>
    );
}

export default Choose;
