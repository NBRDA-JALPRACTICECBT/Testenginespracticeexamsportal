
// CBT Questions
const questions = [
    {
        question: "Who is the Governor of Kaduna State?",
        options: [
            "Uba Sani",
            "Peter Mbah",
            "Ahmad Aliyu",
            "Nasir Idris"
        ],
        answer: 0
    },
    {
        question: "Where is the Headquarters of ECOWAS?",
        options: [
            "Free Town",
            "Cape Town",
            "Abuja",
            "Acrra"
        ],
        answer: 2
    },
    {
        question: "Who is the current EFCC Chairman?",
        options: [
            "Abdulrasheed Bawa",
            "Ola Makinde",
            "Kingsley Tochukwu Udeh",
            "Olanipekun Ola Olukoyede"
        ],
        answer: 3
    },
    {
        question: "When was Nigeria a republic?",
        options: [
            "1960",
            "1953",
            "1963",
            "1940"
        ],
        answer: 2
    },

    {
        question: "Which of these is not an anglophone country as a member of ECOWAS?",
        options: [
            "Nigeria",
            "Ghana",
            "Sierra leone",
            "Guinea"
        ],
        answer: 3
    },
    {
        question: "Who is OPEC Secretary General?",
        options: [
            "Antonio Guterres",
            "Boris Johnson",
            "Haitham Al Ghais",
            "Donald Trump"
        ],
        answer: 2
    },

    {
        question: "What is the new name of FIRS?",
        options: [
            " Federal Inland Revenue Agency",
            "Nigerian Revenue Service",
            "Nigeria Tax Office",
            "Nigeria Revenue Service"
        ],
        answer: 3
    },

    {
        question: "Who is the Chief Justice of the Federation?",
        options: [
            " Kudirat Motonmori Olatokunbo Ekun",
            "Kudirat Abiodun  Motonmori Ola",
            "Kudirat Makinde Olu",
            "Ayo Dapo"
        ],
        answer: 0
    },
    {
        question: "Which of these is not a member of OPEC?",
        options: [
            "UAE",
            "Nigeria",
            "Equatoria Guinea",
            "Morocco"
        ],
        answer: 3
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

     const avgSounds = [
    document.getElementById("sound8"),
    document.getElementById("sound8"),
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

    function playRandomavgSound() {
    // Stop any sounds already playing
    correctSounds.forEach(sound => {
        if (sound) {
        sound.pause();
        sound.currentTime = 0;
         }
    });
// Pick a random sound
    const randomIndex = Math.floor(Math.random() * avgSounds.length);

    // Play it
    avgSounds[randomIndex].play();
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
        playRandomavgSound();
    } else {
        remark = "You need more practice.";
        playRandombooSound();
    }

    document.getElementById("remark").textContent = remark;
}
