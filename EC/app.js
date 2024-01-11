// Déclaration des variables globales
var currentQuestion = 0;
var score = 0;
var level = "";
var quizData = [
  // Ajoutez ici vos questions et réponses avec le niveau de difficulté correspondant
  // Chaque question doit avoir les propriétés suivantes : questionText, correctAnswer, image, difficultyLevel
  {
    questionText: "Qui est ce joueur ?",
    correctAnswer: "Mbappé",
    image: "img/F1.png",
    difficultyLevel: "facile"
  },
  {
    questionText: "Qui est ce joueur ?",
    correctAnswer: "Pelé",
    image: "img/F2.png",
    difficultyLevel: "facile"
  },
  {
    questionText: "Qui est ce joueur ?",
    correctAnswer: "Ibrahimović",
    image: "img/F3.png",
    difficultyLevel: "facile"
  },
  {
    questionText: "Qui est ce joueur ?",
    correctAnswer: "Ronaldo",
    image: "img/F4.png",
    difficultyLevel: "facile"
  },
  {
    questionText: "Qui est ce joueur ?",
    correctAnswer: "Messi",
    image: "img/F5.png",
    difficultyLevel: "facile"
  },

  {
    questionText: "Qui est ce joueur ?",
    correctAnswer: "Ronaldo",
    image: "img/F6.png",
    difficultyLevel: "facile"
  },
  {
    questionText: "Qui est ce joueur ?",
    correctAnswer: "Iniesta",
    image: "img/F7.png",
    difficultyLevel: "facile"
  },
  {
    questionText: "Qui est ce joueur ?",
    correctAnswer: "De bruyne",
    image: "img/F8.png",
    difficultyLevel: "facile"
  },
  {
    questionText: "Qui est ce joueur ?",
    correctAnswer: "Pogba",
    image: "img/F9.png",
    difficultyLevel: "facile"
  },
  {
    questionText: "Qui est ce joueur ?",
    correctAnswer: "Mahrez",
    image: "img/F10.png",
    difficultyLevel: "facile"
  },
  /* Normale*/
  {
    questionText: "Qui est ce joueur ?",
    correctAnswer: "Rice",
    image: "img/N1.png",
    difficultyLevel: "normal"
  },
  {
    questionText: "Qui est ce joueur ?",
    correctAnswer: "Mount",
    image: "img/N2.png",
    difficultyLevel: "normal"
  },
  {
    questionText: "Qui est ce joueur ?",
    correctAnswer: "Cruyff",
    image: "img/N3.png",
    difficultyLevel: "normal"
  },

  /* Difficile*/
  {
    questionText: "Qui est ce joueur ?",
    correctAnswer: "Traoré",
    image: "img/D1.png",
    difficultyLevel: "difficile"
  },
  {
    questionText: "Qui est ce joueur ?",
    correctAnswer: "Jesé",
    image: "img/D2.png",
    difficultyLevel: "difficile"
  },
  /* Expert*/
  {
    questionText: "Qui est ce joueur ?",
    correctAnswer: "Draxler",
    image: "img/E1.png",
    difficultyLevel: "expert"
  },
  {
    questionText: "Qui est ce joueur ?",
    correctAnswer: "Bony",
    image: "img/E2.png",
    difficultyLevel: "expert"
  },
  // Ajoutez plus de questions...
];

// Fonction pour démarrer le quiz
function startQuiz() {
  document.getElementById("section1").style.display = "none";
  document.getElementById("quizContainer").style.display = "block";
  resetQuiz();
  chooseLevel();
  randomizeQuestions();
  displayQuestion();
  
}

// Fonction pour réinitialiser le quiz
function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  level = "";
  resetUserAnswers();
}

// Fonction pour réinitialiser les réponses de l'utilisateur
function resetUserAnswers() {
  quizData.forEach(function (question) {
    question.userAnswer = "";
  });
}

// Fonction pour choisir le niveau de difficulté
function chooseLevel() {
  resetQuiz();
  var validLevel = false;
  while (!validLevel) {
    level = prompt("Choisissez le niveau de difficulté : facile, normal, difficile, expert ou aléatoire").toLowerCase();
    validLevel = validateLevel(level);
  }
}

// Fonction pour valider le niveau de difficulté
function validateLevel(level) {
  return (
    level === "facile" ||
    level === "normal" ||
    level === "difficile" ||
    level === "expert" ||
    level === "aléatoire"
  );
}

// Fonction pour mélanger les questions
function randomizeQuestions() {
  if (level === "aléatoire") {
    quizData = shuffleArray(quizData);
  } else {
    var filteredQuestions = quizData.filter(function (question) {
      return question.difficultyLevel.toLowerCase() === level;
    });
    quizData = shuffleArray(filteredQuestions);

  }
  
}

// Fonction pour afficher une question
function displayQuestion() {
  var questionContainer = document.getElementById("questionContainer");
  var currentQuizData = quizData[currentQuestion];

  questionContainer.innerHTML =
    "<img src='" +
    currentQuizData.image +
    "' class='question-image'>" +
    currentQuizData.questionText +
    "<br>" +
    "<input type='text' id='answerInput' placeholder='Votre réponse'>";

  document.getElementById("answerInput").focus();

  if (level === "expert") {
    setTimeout(nextQuestion, 35000);
  }
}

// ...

// Fonction pour vérifier la réponse
function checkAnswer() {
  var userAnswer = document.getElementById("answerInput").value.trim().toLowerCase();
  var currentQuizData = quizData[currentQuestion];
  currentQuizData.userAnswer = userAnswer;

  if (userAnswer === currentQuizData.correctAnswer.toLowerCase()) {
    score++;
  }

  nextQuestion();
}

// Fonction pour passer à la question suivante
function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    displayQuestion();
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
  quizData.forEach(function (question, index) {
    var questionResult = document.createElement("div");
    questionResult.className = "result";
    questionResult.innerHTML = "Question " + (index + 1) + ": ";
    if (question.correctAnswer.toLowerCase() === question.userAnswer) {
      questionResult.innerHTML += "<span class='answer correct'>" + question.userAnswer + "</span>";
      questionResult.innerHTML += " (correct)";
    } else {
      questionResult.innerHTML += "<span class='answer incorrect'>" + question.userAnswer + "</span>";
      questionResult.innerHTML += " (incorrect, la bonne réponse est <span class='answer correct'>" + question.correctAnswer + "</span>)";
    }
    resultSummary.appendChild(questionResult);
  });

  resetQuiz(); // Réinitialise les variables du quiz
}

// Fonction pour recommencer le quiz
function restartQuiz() {
  document.getElementById("resultContainer").style.display = "none";
  document.getElementById("quizContainer").style.display = "block";
  resetUserAnswers();
  chooseLevel();
  randomizeQuestions();
  displayQuestion();
}


// Fonction pour revenir à la page d'accueil
function goToHome() {
  document.getElementById("resultContainer").style.display = "none";
  document.getElementById("section1").style.display = "block";
}

// Fonction pour mélanger un tableau
function shuffleArray(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
