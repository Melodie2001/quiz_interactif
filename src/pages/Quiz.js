import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Quiz.css';


const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

// Liste complète des questions
const allQuestions = [
  { question: "Quel est l'objectif principal de HTML ?", choices: ["Structurer le contenu", "Styliser le contenu", "Interagir avec le serveur", "Optimiser les requêtes"], answer: "Structurer le contenu", difficulty: "facile" },
  { question: "Que signifie CSS ?", choices: ["Cascading Style Sheets", "Computer Style Syntax", "Creative Style System", "Coded Style Script"], answer: "Cascading Style Sheets", difficulty: "facile" },
  { question: "Quel est le rôle de JavaScript ?", choices: ["Gestion de la logique", "Création de la structure", "Gestion du style", "Aucune de ces réponses"], answer: "Gestion de la logique", difficulty: "facile" },
  { question: "Qu'est-ce que le DOM ?", choices: ["Document Object Model", "Data Object Module", "Direct Object Management", "Dynamic Object Mode"], answer: "Document Object Model", difficulty: "facile" },
  { question: "Quel attribut HTML est utilisé pour ajouter une image ?", choices: ["src", "href", "alt", "title"], answer: "src", difficulty: "facile" },

  { question: "Quel framework JavaScript est principalement utilisé ?", choices: ["React", "Angular", "Vue", "Svelte"], answer: "React", difficulty: "moyen" },
  { question: "Quel langage permet de manipuler une base de données ?", choices: ["SQL", "NoSQL", "Python", "HTML"], answer: "SQL", difficulty: "moyen" },
  { question: "Qu'est-ce que le responsive design ?", choices: ["Un design qui s'adapte à différents écrans", "Un design fixe pour mobile", "Une technique pour optimiser la vitesse", "Une méthode de codage"], answer: "Un design qui s'adapte à différents écrans", difficulty: "moyen" },
  { question: "Quel est le rôle de Flexbox en CSS ?", choices: ["Gérer la disposition des éléments", "Ajouter des animations", "Optimiser les images", "Créer des formulaires"], answer: "Gérer la disposition des éléments", difficulty: "moyen" },
  { question: "Qu'est-ce que le CSS Grid ?", choices: ["Un système de grille", "Une bibliothèque JavaScript", "Un préprocesseur CSS", "Une méthode de compression"], answer: "Un système de grille", difficulty: "moyen" },

  { question: "Que signifie le terme API ?", choices: ["Application Programming Interface", "Automated Program Integration", "Applied Protocol Interface", "Advanced Programming Instruction"], answer: "Application Programming Interface", difficulty: "difficile" },
  { question: "Quel est l'objectif principal de Node.js ?", choices: ["Exécuter du JavaScript côté serveur", "Compiler du code CSS", "Créer des applications mobiles", "Gérer les bases de données"], answer: "Exécuter du JavaScript côté serveur", difficulty: "difficile" },
  { question: "Dans React, qu'est-ce qu'un 'hook' ?", choices: ["Un composant de style", "Une fonction React", "Un moyen d'interagir avec le DOM", "Un type de cycle de vie"], answer: "Une fonction React", difficulty: "difficile" },
  { question: "Qu'est-ce que le Virtual DOM ?", choices: ["Une copie virtuelle du DOM", "Un nouvel élément HTML", "Une bibliothèque de gestion d'état", "Une méthode de routage"], answer: "Une copie virtuelle du DOM", difficulty: "difficile" },
  { question: "Quelle méthode React optimise les performances ?", choices: ["shouldComponentUpdate", "componentDidMount", "useState", "useEffect"], answer: "shouldComponentUpdate", difficulty: "difficile" },
];

function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();
  const chosenLevel = location.state?.difficulty || 'facile';

  // Melange les questions 
  const [shuffledQuestions] = useState(() => shuffleArray(allQuestions.filter(q => q.difficulty === chosenLevel)));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timer, setTimer] = useState(chosenLevel === 'difficile' ? 20 : 10);
  const [shuffledChoices, setShuffledChoices] = useState([]);

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  // Melange les choix une seule fois par question
  useEffect(() => {
    if (currentQuestion) {
      setShuffledChoices(shuffleArray(currentQuestion.choices));
    }
  }, [currentQuestionIndex]);

  // Chronomètre
  useEffect(() => {
    if (timer === 0) return;
    const intervalId = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(intervalId);
          handleNextQuestion();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]); 
  const handleChoiceClick = (choice) => {
    if (!isAnswered) {
      setSelectedChoice(choice);
      setIsAnswered(true);
      if (choice === currentQuestion.answer) {
        setScore(prevScore => prevScore + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedChoice(null);
    setTimer(chosenLevel === 'difficile' ? 20 : 10); // 🔄 Réinitialiser le timer pour la prochaine question

    if (currentQuestionIndex + 1 < shuffledQuestions.length) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      navigate('/result', { state: { score, total: shuffledQuestions.length } });
    }
  };

  return (
    
    <div className="quiz-container">
      <h1>Quiz Interactif - Niveau : {chosenLevel}</h1>
      <div className="timer">
        <strong>Temps restant :</strong> {timer} sec
      </div>
      <div className="question-container">
        <h2>  </h2>
        <ul className="choices">
          {shuffledChoices.map((choice, index) => {
            let className = "";
            if (isAnswered) {
              if (choice === currentQuestion.answer) {
                className = "correct";
              } else if (selectedChoice === choice) {
                className = "incorrect";
              }
            }
            return (
              <li key={index} className={className} onClick={() => handleChoiceClick(choice)}>
                {choice}
              </li>
            );
          })}
        </ul>
      </div>
      <button onClick={handleNextQuestion} disabled={timer > 0 && !isAnswered}>
        Suivant
      </button>
      <div className="score">
        Score : {score} / {shuffledQuestions.length}
      </div>
    </div>
  );
}

export default Quiz;
