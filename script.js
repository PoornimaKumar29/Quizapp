// const questions = [
//     {
//         question: "Which is the largest animal in the world?",
//         answers: [
//             {text: "Shark", correct: false},
//             {text: "Blue whale", correct: true},
//             {text: "Elephant", correct: false},
//             {text: "Giraffe", correct: false}
//         ]
//     },
//     {
//         question: "Which is the smallest country in the world?",
//         answers: [
//             {text: "Vatican City", correct: true},
//             {text: "Bhutan", correct: false},
//             {text: "Nepal", correct: false},
//             {text: "Sri Lanka", correct: false}
//         ]
//     },
//     {
//         question: "Which is the largest desert in the world?",
//         answers: [
//             {text: "Kalahari", correct: false},
//             {text: "Gobi", correct: false},
//             {text: "Sahara", correct: false},
//             {text: "Antarctica", correct: true}
//         ]
//     },
//     {
//         question: "Which is the smallest continent in the world?",
//         answers: [
//             {text: "Asia", correct: false},
//             {text: "Australia", correct: true},
//             {text: "Arctic", correct: false},
//             {text: "Africa", correct: false}
//         ]
//     }
// ];

// const questionElement = document.getElementById("Questions");
// const answerButtonContainer = document.getElementById("answer");
// const nextButton = document.getElementById("next-btn");

// let currentQuestionIndex = 0;
// let score = 0;

// function startQuiz() {
//     currentQuestionIndex = 0;
//     score = 0;
//     nextButton.textContent = "Next";
//     showQuestion();
// }

// function showQuestion() {
//     const currentQuestion = questions[currentQuestionIndex];
//     questionElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    
//     // Clear previous answers
//     answerButtonContainer.innerHTML = "";
    
//     currentQuestion.answers.forEach(answer => {
//         const button = document.createElement("button");
//         button.textContent = answer.text;
//         button.classList.add("btn");
//         button.addEventListener("click", () => selectAnswer(button, answer));
//         answerButtonContainer.appendChild(button);
//     });
// }

// function selectAnswer(button, answer) {
//     // Disable all buttons
//     Array.from(answerButtonContainer.children).forEach(btn => btn.disabled = true);

//     if (answer.correct) {
//         button.style.backgroundColor = "green";
//         button.style.color = "#fff";
//         score++;
//     } else {
//         button.style.backgroundColor = "red";
//         button.style.color = "#fff";
        
//         // Highlight the correct answer
//         const correctButton = Array.from(answerButtonContainer.children).find(btn =>
//             btn.textContent === questions[currentQuestionIndex].answers.find(a => a.correct).text
//         );
//         if (correctButton) {
//             correctButton.style.backgroundColor = "green";
//             correctButton.style.color = "#fff";
//         }
//     }
    
//     nextButton.style.display = "block";
// }

// nextButton.addEventListener("click", () => {
//     currentQuestionIndex++;
//     if (currentQuestionIndex < questions.length) {
//         showQuestion();
//         nextButton.style.display = "none";
//     } else {
//         questionElement.textContent = `Quiz finished! Your score is ${score}/${questions.length}`;
//         answerButtonContainer.innerHTML = "";
//         nextButton.style.display = "none";
//     }
// });

// // Start the quiz when the page loads
// startQuiz();
const questions = [
    // Your questions array
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false}
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            {text: "Vatican City", correct: true},
            {text: "Bhutan", correct: false},
            {text: "Nepal", correct: false},
            {text: "Sri Lanka", correct: false}
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antarctica", correct: true}
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false}
        ]
    }
];

const questionElement = document.getElementById("Questions");
const answerButtonContainer = document.getElementById("answer");
const nextButton = document.getElementById("next-btn");
const retryButton = document.getElementById("retry-btn");
const reviewElement = document.getElementById("review");

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    nextButton.textContent = "Next";
    retryButton.style.display = "none";
    reviewElement.style.display = "none";
    showQuestion();
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    
    // Clear previous answers
    answerButtonContainer.innerHTML = "";
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(button, answer));
        answerButtonContainer.appendChild(button);
    });
}

function selectAnswer(button, answer) {
    // Disable all buttons
    Array.from(answerButtonContainer.children).forEach(btn => btn.disabled = true);

    if (answer.correct) {
        button.style.backgroundColor = "green";
        button.style.color = "#fff";
        score++;
    } else {
        button.style.backgroundColor = "red";
        button.style.color = "#fff";
        
        // Highlight the correct answer
        const correctButton = Array.from(answerButtonContainer.children).find(btn =>
            btn.textContent === questions[currentQuestionIndex].answers.find(a => a.correct).text
        );
        if (correctButton) {
            correctButton.style.backgroundColor = "green";
            correctButton.style.color = "#fff";
        }
    }
    
    // Store user answer
    userAnswers.push({
        question: questions[currentQuestionIndex].question,
        selected: button.textContent,
        correct: answer.correct,
        correctAnswer: questions[currentQuestionIndex].answers.find(a => a.correct).text
    });

    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        nextButton.style.display = "none";
    } else {
        showReview();
        nextButton.style.display = "none";
        retryButton.style.display = "block";
    }
});

retryButton.addEventListener("click", () => {
    startQuiz();
});

function showReview() {
    let reviewHTML = `<h3>Quiz Review</h3>`;
    userAnswers.forEach((answer, index) => {
        reviewHTML += `
            <p><strong>Question ${index + 1}:</strong> ${answer.question}</p>
            <p><strong>Your Answer:</strong> ${answer.selected}</p>
            <p><strong>Correct Answer:</strong> ${answer.correctAnswer}</p>
            <hr/>
        `;
    });
    reviewHTML += `<p><strong>Your Score:</strong> ${score}/${questions.length}</p>`;
    reviewElement.innerHTML = reviewHTML;
    reviewElement.style.display = "block";
}

// Start the quiz when the page loads
startQuiz();
