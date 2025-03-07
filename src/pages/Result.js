import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Result.css';

function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, total } = location.state || { score: 0, total: 0 };

  return (
    <div className="result-container">
      <h1>Résultat du Quiz</h1>
      <p>Votre score : <strong>{score} / {total}</strong></p>

      <div className="button-container">
        <button className="btn-home" onClick={() => navigate('/')}>
          Retour à l'Accueil
        </button>
        <button className="btn-choose-level" onClick={() => navigate('/choose-level')}>
          Rejouer
        </button>
      </div>
    </div>
  );
}

export default Result;



