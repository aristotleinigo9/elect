const PASSWORD = 'Yan.02'; // Set your password here
let timer;
let userName, userId;
let countdownTimer;
let quizActive = true;


function startQuiz() {
    const name = document.getElementById('name').value;
    const id = document.getElementById('id').value;
    const password = document.getElementById('password').value;

    if (!name || !id || password !==PASSWORD) {
        alert("Check your name, id or password.");
        return;
    }

    userName = name;
    userId = id;

    document.getElementById('user-info').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';

    startTimer();
    document.getElementById('user-info-display').innerText = `Name: ${userName}, ID: ${userId}`;
}


function startTimer() {
    const endTime = Date.now() + 50 * 60 * 1000; // after + is the number of minutes of the quiz
    countdownTimer = setInterval(() => {
        const now = Date.now();
        const timeLeft = endTime - now;

        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            document.getElementById('timer').innerText = 'Time is up!';
            submitQuiz();
            return;
        }

        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        document.getElementById('countdown').innerText = `${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}

function submitQuiz() {
    clearInterval(timer);

    const answers = document.querySelectorAll('input[type="radio"]:checked');
    let score = 0;

    // Define the correct answers
    const correctAnswers = {
        q1: 'c',
        q2: 'c',
        q3: 'b',
        q4: 'a',
        q5: 'c',
        q6: 'b',
        q7: 'b',
        q8: 'c',
        q9: 'd',
        q10: 'b',
        q11: 'c',
        q12: 'a',
        q13: 'b',
        q14: 'a',
        q15: 'c',
        q16: 'b',
        q17: 'c',
        q18: "a",
        q19: 'b',
        q20: 'c'

        // Add more correct answers here
    };

    answers.forEach(answer => {
        if (correctAnswers[answer.name] === answer.value) {
            score++;
        }
    });

    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('score').innerText = `Your score is ${score}/20`;
}

function downloadPDF() {
    const jsPDF = window.jspdf.jsPDF;
    const doc = new jsPDF();
    
    const title = 'ELECT Final Reading and Vocabulary Section';
    const date = new Date().toLocaleString();
    
    doc.text(title, 30, 30);
    doc.text(`Name: ${userName}`, 30, 40);
    doc.text(`ID: ${userId}`, 30, 50);
    doc.text(`Date & Time: ${date}`, 30, 60);
    doc.text(`Score: ${document.getElementById('score').innerText}`, 30, 70);
    doc.text('Rename this file and send/airdrop to your teacher.', 30, 80);
    
    doc.save('type your id-ELECT Final Reading and Vocabulary Section.pdf');
}


function closeQuiz(){
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('close').style.display = 'block';
}


function handleVisibilityChange() {
    if (document.hidden) {
        alert("The test has been closed due to minimized page, another opened tab or user submitted the test.");
        closeQuiz()
    }
}

document.addEventListener('visibilitychange', handleVisibilityChange);

