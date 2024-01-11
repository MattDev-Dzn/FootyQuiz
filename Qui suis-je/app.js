// Déclaration des variables globales
var currentQuestion = 0;
var score = 0;
var level = "";
var quizData = [
    {
      questionText: "Qui est ce joueur ?",
      correctAnswer: "Mbappé",
      clubs: ["- Monaco", "- PSG"],
      difficultyLevel: "facile"
    },

    {
        questionText: "Qui est ce joueur ?",
        correctAnswer: "Özil",
        clubs: ["- Schalke 04", "- Werder Brême", "- Real Madrid", "- Arsenal FC", "- Fenerbahçe SK", "- İstanbul Başakşehir" ],
        difficultyLevel: "facile"
      },

      {
        questionText: "Qui est ce joueur ?",
        correctAnswer: "Messi",
        clubs: ["- FC Barcelone", "- PSG", "- Inter Miami"],
        difficultyLevel: "facile"
      },

    {
      questionText: "Qui est ce joueur ?",
      correctAnswer: "Pelé",
      clubs: ["- Santos", "- New York Cosmos"],
      difficultyLevel: "facile"
    },

    {
        questionText: "Qui est ce joueur ?",
        correctAnswer: "Ronaldo",
        clubs: ["- Sporting CP", "- Manchester United", "- Real Madrid", "- Juventus", "- Manchester United", "- Al Nassr"],
        difficultyLevel: "facile"
      },

      {
        questionText: "Qui est ce joueur ?",
        correctAnswer: "Ronaldinho",
        clubs: ["- Gremio", "- PSG", "- FC Barcelone", "- AC Milan", "- Flamengo", "- Atlético Mineiro", "- Querétaro FC", "- Fluminense"],
        difficultyLevel: "facile"
      },

      {
        questionText: "Qui est ce joueur ?",
        correctAnswer: "Benzema",
        clubs: ["- Lyon B", "- Lyon", "- Real Madrid", "- Al Ittihad"],
        difficultyLevel: "facile"
      },

      {
        questionText: "Qui est ce joueur ?",
        correctAnswer: "Modrić",
        clubs: ["- Dinamo Zagreb", "- Zrinjski Mostar", "- Inter Zaprešić", "- Tottenham Hotspur", "- Real Madrid"],
        difficultyLevel: "facile"
      },

      {
        questionText: "Qui est ce joueur ?",
        correctAnswer: "Neymar",
        clubs: ["- Santos FC", "- FC Barcelone", "- PSG", "- Al Hilal"],
        difficultyLevel: "facile"
      },

      {
        questionText: "Qui est ce joueur ?",
        correctAnswer: "Kroos",
        clubs: ["- Bayern Munich", "- Bayer Leverkusen", "- Bayern Munich", "- Real Madrid"],
        difficultyLevel: "facile"
      },

      {
        questionText: "Qui est ce joueur ?",
        correctAnswer: "Pogba",
        clubs: ["- Manchester United", "- Juventus", "- Manchester United", "- Juventus"],
        difficultyLevel: "facile"
      },

    // NORMAL
    {
        questionText: "Qui est ce joueur ?",
        correctAnswer: "Pogba",
        clubs: ["- Manchester United", "- Juventus", "- Manchester United", "- Juventus"],
        difficultyLevel: "normal"
      },

      // EXPERT

      {
        questionText: "Qui est ce joueur ?",
        correctAnswer: "Pogba",
        clubs: ["- Manchester United", "- Juventus", "- Manchester United", "- Juventus"],
        difficultyLevel: "expert"
      },
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
    level = prompt("Choisissez le niveau de difficulté : facile, normal, expert ou aléatoire").toLowerCase();
    validLevel = validateLevel(level);
  }
}

// Fonction pour valider le niveau de difficulté
function validateLevel(level) {
  return (
    level === "facile" ||
    level === "normal" ||
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
  
    document.getElementById("questionTitle").textContent = currentQuizData.questionText;
    var clubList = document.getElementById("clubList");
    clubList.innerHTML = "";
    
  
    for (var i = 0; i < currentQuizData.clubs.length; i++) {
      var club = currentQuizData.clubs[i];
      var listItem = document.createElement("li");
      listItem.textContent = club;
      clubList.appendChild(listItem);
    }
  
    document.getElementById("answerInput").value = "";
    document.getElementById("answerInput").focus();
  
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