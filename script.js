var questions = [{
        question: "1. What would be the resule of 3 + 2 * 7?",
        option1: "35",
        option2: "327",
        option3: "17",
        answer: "2"
    }, 
    {
        question: "2. Which HTML tag is used to define an interval style sheet?",
        option1: "<style>",
        option2: "<script>",
        option3: "<css>",
        answer: "1"
    },
    {
        question: "3. What will this output? var a = [1, 2, 3]; console.log(a[6]);",
        option1: "undefined",
        option2: "0",
        option3: "6",
        answer: "0"
    }, 
    {
        question: "4. What type of question gives a True/False or Yes/No answer?",
        option1: "confirm",
        option2: "prompt",
        option3: "neither",
        answer: "0"
    }, 
    {
        question: "5. Out of the 3 fundamental programming languages, Javascript is which one?",
        option1: "first",
        option2: "second",
        option3: "third",
        answer: "2"
    }, 
    {
        question: "6. What does querySelector do?",
        option1: "gives array of any element it can find",
        option2: "pulls first element it finds",
        option3: "selects every function it finds",
        answer: "1"
    }, 
    {
        question: "7. What does an alert do?",
        option1: "displays discreetly to the debugger",
        option2: "displays a pop-up message to the user",
        option3: "calls 911",
        answer: "13"
    }, 
    {
        question: "8. What is the method for converting a string to lowercase letters?",
        option1: ".toLowerCase()",
        option2: ".Lowercase()",
        option3: ".toMakeLowerCase()",
        answer: "0"
    }, 
    {
        question: "9. What does the 'i < array.length;' stand for in a for loop?",
        option1: "iterator",
        option2: "condition",
        option3: "increment",
        answer: "1"
    }, 
    {
        question: "10. What function returns the largest integer less than or equal to a given number?",
        option1: "Math.ceiling()",
        option2: "Math.floor()",
        option3: "Math.solid()",
        answer: "1"
    }];

    //Setting numerical variables for the functions
    var curQuestion = -1;
    var score = 0;
    var timeRemaining = 0;
    var timer;
    
    //Start countdown once user clicks 'start'   
    function start() {

        timeRemaining = 300;
        document.getElementById("timeRemaining").innerHTML = timeRemaining;

        timer = setInterval(function() {
            timeRemaining--;
            document.getElementById("timeRemaining").innerHTML = timeRemaining;
            //Proceed to the end game function when timer hits 0
            if (timeRemaining <= 0) {
                clearInterval(timer);
                endGame();
            }
        }, 1000);

        next();
    }

    //Stop timer to end game
    function endGame() {
        clearInterval(timer);

        var quizContent = `
        <h2>Game Over!</h2>
        <h3>You got a ' + score + / 10 + ' questions correct!</h3>
        <input type="text" id="name" placeholder="First name">
        <button onclick="setScore()">Set score!</button>`;

        document.getElementById("quizBody").innerHTML =quizContent;
    }

    //Store scores on local storage
    function setScore() {
        localStorage.setItem("highscore", score);
        localStorage.setItem("highscoreName", document.getElementById('name').value);
        getScore();
    }

    function  getScore() {
        var quizContent = `
        <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
        <h1>` + localStorage.getItem("highscore") + `</h1><br>

        <button onclick="cleaerScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>

        `;

        document.getElementById("quizBody").innerHTML = quizContent;
            
    }

    //Clears the score name and value in the local storage if user selects to "clear score"
    function clearScore() {
        localStorage.setItem("highscore", "");
        localStorage.setItem("highscoreName", "");

        resetGame();
        
    }

    //Reset game
    function resetGame() {
        clearInterval(timer);
        score = 0;
        curQuestion = -1;
        timeRemaining = 0;
        timer = null;

        document.getElementById("timeRemaining").innerHTML = timeRemaining;

        var quizContent = `
        <h1>
        JavaScript Quiz!
        </h1>
        <h3>
        Click to Play!
        </h3>
        <button onclick="start()">Start!</button>`;

        document.getElementById("quizBody").innerHTML = quizContent;
                
    }

    //Deduct 15 seconds from time if user chooses wrong answer
    function incorrect() {
        timeRemaining -= 15;
        next();
        
    }

    //Increases score by 10 points if correct answer is choosen
    function corrrect() {
        score += 10;
        next();
        
    }

    //For loop through questions
    function next() {
        curQuestion++;

        if (curQuestion > questions.length - 1) {
            endGame();
            return;
        }

        var quizContent = "<h2>" + questions[curQuestion].title + "</h2>"

        for (var buttonLoop = 0; buttonLoop < questions[curQuestion].choices.length; buttonLoop++) {
            var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>";
            buttonCode = buttonCode.replace("[CHOICE]", questions[curQuestion].choices[buttonLoop]);
            if (questions[curQuestion].choices[buttonLoop] == questions[curQuestion].answer) {
                buttonCode = buttonCode.replace("[ANS]", "correct()");
            }
            else {
                buttonCode = buttonCode.replace("[ANS]", "incorrect()");
            }
            quizContent += buttonCode
        }

        document.getElementById("quizBody").innerHTML = quizContent;  
    }
    
    

    