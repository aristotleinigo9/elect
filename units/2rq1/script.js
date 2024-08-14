const PASSWORD = 'Read.01'; // Set your password here
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
        q1: 'b',
        q2: 'd',
        q3: 'a',
        q4: 'd',
        q5: 'c',
        q6: 'a',
        q7: 'a',
        q8: 'b',
        // q9: 'd',
        // q10: 'b',
        // q11: 'c',
        // q12: 'a',
        // q13: 'b',
        // q14: 'a',
        // q15: 'c',
        // q16: 'b',
        // q17: 'c',
        // q18: "a",
        // q19: 'b',
        // q20: 'c'

        // Add more correct answers here
    };

    answers.forEach(answer => {
        if (correctAnswers[answer.name] === answer.value) {
            score++;
        }
    });

    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('score').innerText = `Your score is ${score}/8`;
}

function downloadPDF() {
    const jsPDF = window.jspdf.jsPDF;
    const doc = new jsPDF();
    
    const title = 'ELECT Reading Quiz 1 Units 1B-2A';
    const date = new Date().toLocaleString();
    
    doc.text(title, 30, 30);
    doc.text(`Name: ${userName}`, 30, 40);
    doc.text(`ID: ${userId}`, 30, 50);
    doc.text(`Date & Time: ${date}`, 30, 60);
    doc.text(`Score: ${document.getElementById('score').innerText}`, 30, 70);
    doc.text('Rename this file and send/airdrop to your teacher.', 30, 80);
    
    doc.save('type your id-ELECT Reading Quiz 1.pdf');
}


function handleVisibilityChange() {
    if (document.hidden) {
        // The user has navigated away or minimized the window
        alert("The quiz has been closed due to minimized page or another opened tab.");
        // You can perform other actions here, such as saving progress, logging out, etc.
        submitQuiz()
    }
}

document.addEventListener('visibilitychange', handleVisibilityChange);








// window.onload = function() {
//     // enterFullScreen();
//     webkitRequestFullscreen();
// };

// document.addEventListener('visibilitychange', function () {
//     if (document.hidden) {
//         alert('The quiz has been closed due to user minimizing the page or opening a new tab.');
//     } else {
//         submitQuiz();
//     }
// });


// function handleVisibilityChange() {
//     if (document.hidden) {
//         // The page is hidden (user switched tabs or minimized)
//         quizActive = false;
//         alert('The quiz has been closed due to user minimizing the page or opening a new tab.');
//     } else {
//         // The page is visible again (user returned to the tab)
//         // quizActive = true;
//         submitQuiz();
//     }
// }

// Add event listener for visibility change
// document.addEventListener('visibilitychange', handleVisibilityChange);

// Enter full-screen mode when the script is loaded


// // Event listener to try and prevent exiting full-screen mode
// document.addEventListener('fullscreenchange', function () {
//     if (!document.fullscreenElement) {
//         // enterFullScreen();
//         submitQuiz();
//     } 
// });