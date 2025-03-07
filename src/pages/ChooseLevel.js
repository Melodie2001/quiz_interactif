import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ChooseLevel.css';

function ChooseLevel() {
  const navigate = useNavigate();

  const selectLevel = (level) => {
    navigate('/quiz', { state: { difficulty: level } });
  };

  return (
    <div
      className="choose-level-container"
        
    > 
      <h1>Choisissez votre niveau</h1>
      <div className="levels">
        <button className="level-btn level-easy" onClick={() => selectLevel('facile')}>
          Facile
        </button>
        <button className="level-btn level-medium" onClick={() => selectLevel('moyen')}>
          Moyen
        </button>
        <button className="level-btn level-hard" onClick={() => selectLevel('difficile')}>
          Difficile
        </button>
      </div>
    </div>
  );
}

export default ChooseLevel;



  
  