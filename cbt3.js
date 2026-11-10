
// CBT Questions
const questions = [
    {
        question: " Who is responsible for appointing the Head of the Civil Service of the Federation?",
        options: [
            "The Senate President",
            "SGF",
            "The Chief Justice",
            "The President"
        ],
        answer: 3
    },
    {
        question: "What is not another name for performance Appraisal?",
        options: [
            "Personal rating",
            "Merit rating",
            "Employee evaluation",
            "Supervisor rating"
        ],
        answer: 3
    },
    {
        question: "What is considered misconduct in the public service?",
        options: [
            " Punctuality",
            "Honest",
            "Dedication to work",
            " Negligence of duty"
        ],
        answer: 3
    },
    {
        question: " How many working days of maternity leave is a female officer entitled to?",
        options: [
            "90 days",
            " 112 days",
            "100 days",
            "120 days"
        ],
        answer: 1
    },

    {
        question: "What is the meaning of earned leave??",
        options: [
            "Leave due to an officer for service rendered to government",
            " Leave granted for sickness",
            " Leave granted without salary",
            "Leave granted for examination"
        ],
        answer: 0
    },
    {
        question: "What is redundancy?",
        options: [
            "Purchase of excess tools",
            "Large number of staff",
            "Too many idle animals in the livestock department",
            "Involuntary loss of employment due to excess manpower"
        ],
        answer: 2
    },

    {
        question: "How many working days of paternity leave are granted to a male officer?",
        options: [
            " 14 days",
            "7 days",
            "20 days",
            "9 days"
        ],
        answer: 0
    },

    {
        question: "What can make the petition of an officer to be disregarded",
        options: [
            " Petition with full name",
            "Petition with decent language",
            "Petition without pending court case",
            "Petition with abusive language"
        ],
        answer: 3
    },
    {
        question: "Serious misconduct exclude?",
        options: [
            "Bribery",
            "Advance fee fraud",
            "Sleeping on duty",
            "Violation of Oath of secrecy"
        ],
        answer: 2
    }
];

// Variables
let currentQuestion = 0;
let userAnswers = new Array(questions.length).fill(null);
let timeLeft = 300;
let timer;

// Start Quiz
function startQuiz() {
    const name = document.getElementById("student-name").value.trim();
    const studentId = document.getElementById("student-ID").value.trim();
    if (name === "") {
        alert("Please enter your name");
        return;
    }

     if (studentId  === "") {
        alert("Please enter your  ID");
        return;
    }
  

    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");

    showQuestion();
    createNavigation();
    startTimer();
}

// Display Question
function showQuestion() {
    const q = questions[currentQuestion];

    document.getElementById("question").textContent = q.question;

    document.getElementById("progress-text").textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach((option, index) => {
        const label = document.createElement("label");
        label.className = "option";

        const radio = document.createElement("input");

        radio.type = "radio";
        radio.name = "answer";
        radio.value = index;

        if (userAnswers[currentQuestion] === index) {
            radio.checked = true;
        }

        radio.addEventListener("change", function() {
            userAnswers[currentQuestion] = index;
            createNavigation();
        });

        label.appendChild(radio);
        label.appendChild(document.createTextNode(option));

        optionsDiv.appendChild(label);
    });

    document.getElementById("prev-btn").disabled =
        currentQuestion === 0;

    document.getElementById("next-btn").disabled =
        currentQuestion === questions.length - 1;
}

// Next Question
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
        createNavigation();
    }
}

// Previous Question
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
        createNavigation();
    }
}

// Create Question Navigation
function createNavigation() {
    const nav = document.getElementById("question-numbers");
    nav.innerHTML = "";

    questions.forEach((question, index) => {
        const btn = document.createElement("button");

        btn.textContent = index + 1;
        btn.className = "question-btn";

        if (userAnswers[index] !== null) {
            btn.classList.add("answered");
        }

        if (index === currentQuestion) {
            btn.classList.add("current");
        }

        btn.onclick = function() {
            currentQuestion = index;
            showQuestion();
            createNavigation();
        };

        nav.appendChild(btn);
    });
}

// Countdown Timer
function startTimer() {
    timer = setInterval(function() {

        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        document.getElementById("time").textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time is up! Your examination will be submitted.");
            submitQuiz();
        }

        timeLeft--;

    }, 1000);
}

// Submit Quiz
function submitQuiz() {
    const confirmSubmit = confirm(
        "Are you sure you want to submit your examination?"
    );

    if (!confirmSubmit) {
        return;
    }

    clearInterval(timer);
    calculateResult();
}

const correctSounds = [
    document.getElementById("sound3"),
    document.getElementById("sound5"),
    ];

    const booSounds = [
    document.getElementById("sound4"),
    document.getElementById("sound4"),
    ];

function playRandomCorrectSound() {
    // Stop any sounds already playing
    correctSounds.forEach(sound => {
        if (sound) {
        sound.pause();
        sound.currentTime = 0;
         }
    });
// Pick a random sound
    const randomIndex = Math.floor(Math.random() * correctSounds.length);

    // Play it
    correctSounds[randomIndex].play();
    }

    function playRandombooSound() {
    // Stop any sounds already playing
    correctSounds.forEach(sound => {
        if (sound) {
        sound.pause();
        sound.currentTime = 0;
         }
    });
// Pick a random sound
    const randomIndex = Math.floor(Math.random() * booSounds.length);

    // Play it
    booSounds[randomIndex].play();
    }
// Calculate Score
function calculateResult() {
    let score = 0;

    questions.forEach((question, index) => {
        if (userAnswers[index] === question.answer) {
            score++;
             playRandomCorrectSound();
        }
    });

    const percentage = (score / questions.length) * 100;

    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");

    const name = document.getElementById("student-name").value;

    document.getElementById("result-name").textContent =
        "Officer: " + name;

    document.getElementById("score").textContent =
        `${score} / ${questions.length}`;

    document.getElementById("percentage").textContent =
        `Percentage: ${percentage.toFixed(1)}%`;

    let remark;

    if (percentage >= 70) {
        remark = "Excellent! You passed.";
         playRandomCorrectSound();
    } else if (percentage >= 50) {
        remark = "Good effort! Keep improving.";
    } else {
        remark = "You need more practice.";
        playRandombooSound();
    }

    document.getElementById("remark").textContent = remark;
}
