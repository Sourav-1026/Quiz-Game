// Dom Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answerContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question:
      "In which year did the Hijrah (migration) from Makkah to Madinah take place?",
    answers: [
      { text: "615 CE", correct: false },
      { text: "622 CE", correct: true },
      { text: "610 CE", correct: false },
      { text: "630 CE", correct: false },
    ],
  },
  {
    question:
      "Who was the first Caliph of Islam after the death of Prophet Muhammad (ﷺ)?",
    answers: [
      { text: "Umar ibn Al-Khattab (RA)", correct: false },
      { text: "Uthman ibn Affan (RA)", correct: false },
      { text: "Abu Bakr As-Siddiq (RA)", correct: true },
      { text: "Ali ibn Abi Talib (RA)", correct: false },
    ],
  },
  {
    question:
      "Which battle is known as the first major battle in Islamic history?",
    answers: [
      { text: "Battle of Uhud", correct: false },
      { text: "Battle of Khandaq", correct: false },
      { text: "Battle of Badr", correct: true },
      { text: "Battle of Hunayn", correct: false },
    ],
  },
  {
    question:
      "During whose caliphate was the Quran compiled into a single book form?",
    answers: [
      { text: "Abu Bakr (RA)", correct: true },
      { text: "Umar (RA)", correct: false },
      { text: "Uthman (RA)", correct: false },
      { text: "Ali (RA)", correct: false },
    ],
  },
  {
    question: "Which city became the capital of the Umayyad Caliphate?",
    answers: [
      { text: "Makkah", correct: false },
      { text: "Madinah", correct: false },
      { text: "Kufa", correct: false },
      { text: "Damascus", correct: true },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// EVENT LISTENERS
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  showQuestion();
}

function showQuestion() {
  answersDisabled = false;
  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";
  questionText.textContent = currentQuestion.question;

  answerContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);
    answerContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answersDisabled) return;

  answersDisabled = true;

  const selectButton = event.target;
  const isCorrect = selectButton.dataset.correct === "true";

  Array.from(answerContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You are a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You will get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}
