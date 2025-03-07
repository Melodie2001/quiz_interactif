import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const goToChooseLevel = () => {
    navigate('/choose-level');
  };

  return (
    <div className="home-container">
      <video className="background-video" autoPlay muted loop>
        <source src="/videos/background.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la vidéo.
      </video>

      <div className="overlay"></div>

      <div className="home-content">
        <h1>Bienvenue sur le Quiz Interactif</h1>
        <p>
          Testez vos connaissances en développement web et choisissez le niveau qui vous convient.
        </p>
        <button onClick={goToChooseLevel}>Commencez </button>
      </div>
    </div>
  );
}

export default Home;


