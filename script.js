const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const questionsElement = document.getElementById("questions");
const scoreElement = document.getElementById("score");
const submitButton = document.getElementById("submit");

// Retrieve answers from sessionStorage if available
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render the questions
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear for re-render (useful after refresh)
  questions.forEach((q, i) => {
    const questionDiv = document.createElement("div");
    const questionText = document.createElement("p");
    questionText.textContent = q.question;
    questionDiv.appendChild(questionText);

    q.choices.forEach((choice) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${i}`;
      input.value = choice;
      if (userAnswers[i] === choice) input.checked = true;

      // Save answer on change
      input.addEventListener("change", () => {
        userAnswers[i] = input.value;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionDiv);
  });

  // Show score from localStorage if already submitted
  const storedScore = localStorage.getItem("score");
  if (storedScore !== null) {
    scoreElement.textContent = `Your score is ${storedScore} out of 5.`;
  }
}

renderQuestions();

// Handle submit
submitButton.addEventListener("click", () => {
  let score = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) {
      score++;
    }
  });

  // Display and store final score
  scoreElement.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
});
