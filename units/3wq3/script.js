const PASSWORD = 'Write.03'; // Set your password here
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

function submitQuiz(){
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';
}

// function closeQuiz(){
//     document.getElementById('quiz').style.display = 'none';
//     document.getElementById('close').style.display = 'block';
// }


function handleVisibilityChange() {
    if (document.hidden) {
        alert("The quiz has been closed due to minimized page or another opened tab. Call your teacher or proctor.");
        // closeQuiz()
    }
}

document.addEventListener('visibilitychange', handleVisibilityChange);

