let questions = [
    {
        question: "Which of the following is a CSS framework?",
        answers: [
            { text: "React", correct: false},
            { text: "Bootstrap", correct: true},
            { text: "Angular", correct: false},
            { text: "Next JS", correct: false},
        ]
    },

    {
        question: "Which of the following is a version control system?",
        answers: [
            { text: "Figma", correct: false},
            { text: "GitHub", correct: false},
            { text: "Python", correct: false},
            { text: "Git", correct: true},
        ]
    },

    {
        question: "Which of the following belongs to Microsoft?",
        answers: [
            { text: "LinkedIn", correct: true},
            { text: "Twitter", correct: false},
            { text: "Instagram", correct: false},
            { text: "Behance", correct: false},
        ]
    },

    {
        question: "Which of the following is the owner of ChatGPT?",
        answers: [
            { text: "Microsoft", correct: false},
            { text: "Google", correct: false},
            { text: "OpenAI", correct: true},
            { text: "Meta", correct: false},
        ]
    }
]
// This JavaScript code defines an array named questions. Each element of this array is an object representing a question along with its possible answers.

let questionElement = document.querySelector("h2");
let btnContainer = document.querySelector(".btn-container");
let nextBtn = document.querySelector(".next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        let button = document.createElement("button");
        button.innerHTML = answer.text;
        btnContainer.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextBtn.style.display = "none";
    while(btnContainer.firstChild) {
        btnContainer.removeChild(btnContainer.firstChild);
    }
}

function selectAnswer(e) {
    let selectedOption = e.target;
    let isCorrect = selectedOption.dataset.correct === "true";

    if(isCorrect) {
        selectedOption.style.backgroundColor = "#00800097"; // Green color for correct answer
        selectedOption.style.color = "#fff";
        score++;
    } else {
        selectedOption.style.backgroundColor = "#ff6d6d"; // Red color for wrong answer
        selectedOption.style.color = "#fff";

        // Find and highlight the correct answer
        Array.from(btnContainer.children).forEach(button => {
            if (button.dataset.correct === "true") {
                button.style.backgroundColor = "#00800097"; // Green color for correct answer
                button.style.color = "#fff";
            }
        });
    }

    // Disable all buttons after selection
    Array.from(btnContainer.children).forEach(button => {
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}


nextBtn.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

startQuiz();

