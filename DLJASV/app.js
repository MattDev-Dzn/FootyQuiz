// Déclaration des variables globales
var currentQuestion = 0;
var audioPlayer;
var correctAnswersCount = 0; // Variable pour stocker le nombre de réponses correctes
var quizData = [
  // Ajoutez ici vos extraits audio
  {
    audioSrc: "Audio/Kylian Mbappé.mp3",
    question: "Quel est le nom du joueur dans cet extrait audio ?",
    correctAnswer: "Mbappé"
  },
  {
    audioSrc: "Audio/Simons.mp3",
    question: "Quel est le nom du joueur dans cet extrait audio ?",
    correctAnswer: "Simons"
  }, 
  {
    audioSrc: "Audio/Messi.mp3",
    question: "Quel est le nom du joueur dans cet extrait audio ?",
    correctAnswer: "Messi"
  },

  {
    audioSrc: "Audio/CR7.mp3",
    question: "Quel est le nom du joueur dans cet extrait audio ?",
    correctAnswer: "Ronaldo"
  },
  {
    audioSrc: "Audio/Courtois.mp3",
    question: "Quel est le nom du joueur dans cet extrait audio ?",
    correctAnswer: "Courtois"
  },
  {
    audioSrc: "Audio/Griezmann.mp3",
    question: "Quel est le nom du joueur dans cet extrait audio ?",
    correctAnswer: "Griezmann"
  },
  {
    audioSrc: "Audio/Kimmich.mp3",
    question: "Quel est le nom du joueur dans cet extrait audio ?",
    correctAnswer: "Kimmich"
  },
  {
    audioSrc: "Audio/Zidane.mp3",
    question: "Quel est le nom du joueur dans cet extrait audio ?",
    correctAnswer: "Zidane"
  },
  {
    audioSrc: "Audio/Xavi.mp3",
    question: "Quel est le nom du joueur dans cet extrait audio ?",
    correctAnswer: "Xavi"
  },
  {
    audioSrc: "Audio/Maradona.mp3",
    question: "Quel est le nom du joueur dans cet extrait audio ?",
    correctAnswer: "Maradona"
  },
  {
    audioSrc: "Audio/Neymar.mp3",
    question: "Quel est le nom du joueur dans cet extrait audio ?",
    correctAnswer: "Neymar"
  },
  // Ajoutez plus d'extraits audio...
];

// Fonction pour démarrer le quiz
function startQuiz() {
    document.getElementById("section1").style.display = "none";
    document.getElementById("quizContainer").style.display = "block";
    resetQuiz();
    shuffleQuestions();
    displayAudio();
  }

// Fonction pour mélanger les questions
function shuffleQuestions() {
    quizData.sort(() => Math.random() - 0.5);
    quizData = quizData.slice(0, 10); // Limite le nombre de questions à 10
  }

// Fonction pour réinitialiser le quiz
function resetQuiz() {
  currentQuestion = 0;
}

// Fonction pour afficher un extrait audio et la question correspondante
function displayAudio() {
  audioPlayer = document.getElementById("audioPlayer");
  audioPlayer.src = quizData[currentQuestion].audioSrc;
  audioPlayer.load();
  document.getElementById("questionContainer").textContent = quizData[currentQuestion].question;
}

// Fonction pour vérifier la réponse
function checkAnswer() {
    var userAnswer = document.getElementById("answerInput").value.trim();
    var correctAnswer = quizData[currentQuestion].correctAnswer;
  
    // Réinitialise la valeur de l'élément answerInput
    document.getElementById("answerInput").value = "";
  
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      correctAnswersCount++; // Incrémente le compteur des réponses correctes
    }
  
    nextQuestion();
  }

// Fonction pour passer à la question suivante (prochain extrait audio)
function nextQuestion() {
    currentQuestion++;
  
    if (currentQuestion < quizData.length) {
      displayAudio();
      document.getElementById("answerInput").value = ""; // Réinitialise la zone de réponse
    } else {
      showResult();
    }
}

  
  // Fonction pour afficher le résultat
function showResult() {
    document.getElementById("quizContainer").style.display = "none";
    document.getElementById("resultContainer").style.display = "block";

    var resultSummary = document.getElementById("resultSummary");
    resultSummary.innerHTML = "";

    resultSummary.innerHTML = "Score : " + correctAnswersCount + " / 10";

    resetQuiz(); // Réinitialise les variables du quiz
}

// Fonction pour recommencer le quiz
function restartQuiz() {
    document.getElementById("resultContainer").style.display = "none";
    document.getElementById("quizContainer").style.display = "block";
    resetQuiz();
    shuffleQuestions(); // Si vous avez une fonction shuffleQuestions pour mélanger les questions, appelez-la ici
    correctAnswersCount = 0; // Réinitialise le compteur des réponses correctes
    displayAudio();
}
  
  
  // Fonction pour revenir à la page d'accueil
  function goToHome() {
    document.getElementById("resultContainer").style.display = "none";
    document.getElementById("section1").style.display = "block";
  }
  
  // Appel à la fonction startQuiz pour démarrer le quiz
  document.getElementById("startButton").addEventListener("click", startQuiz);
  
  // Écouteur d'événement pour la soumission de réponse lorsque l'utilisateur appuie sur "Enter"
  document.getElementById("answerInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      checkAnswer();
    }
  });
  
  // Écouteur d'événement pour la soumission de réponse lorsque l'utilisateur clique sur le bouton "Soumettre"
  document.getElementById("submitAnswer").addEventListener("click", checkAnswer);