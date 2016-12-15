$(document).ready(function () {
    var numberQuestions = questions.length;
    var current_score;

    var guess0_btn=$("#guess0");
    guess0_btn.click(function () {
        guessButtonClick(guess0_btn);
    });

    var guess1_btn=$("#guess1");
    guess1_btn.click(function () {
        guessButtonClick(guess1_btn);
    });

    $("#tryagain").click(function () {
        initGame();
        showQuestion();
    });
    var time;
    var current;
    var intervalControl;
    //start game
    initGame();
    showQuestion();
    //functions
    function initGame() {
        $("#total_score").text(numberQuestions * 10);
        current_score = 0;
        $("#curr_score").text(current_score);
        time = 10;//10 seconds
        current = 0;

        $("#guess0").css("display", "block");
        $("#guess1").css("display", "block");
        $("#counter").css("display", "block");
        $("#tryagain").css("display", "none");

        $("#counter").text = (time + " seconds remaining...");
        intervalControl = setInterval(countdown, 1000);
        function countdown() {
            if (time == 0) {
                //Time out
                clearInterval(intervalControl);
                showResult();
            } else {
                time--;
                $("#counter").text(time + " seconds remaining...");
            }
        }
    }

    function guessButtonClick(button) {
        console.log("Current question:" + current);
        var answer;
        if (button.id === "guess0") {
            answer = 1;
        } else {
            answer = 2;
        }

        if (answer === questions[current].correctAnswer) {
            current_score += 10;
            $("#curr_score").text(current_score);
        }
        if (current < numberQuestions - 1) {
            current++;
            showQuestion();
        } else {
            showResult();
        }

    }

    function showResult() {
        clearInterval(intervalControl);
        $("#question").text("Congratulation, your score is " + current_score + "/" + numberQuestions * 10);
        $("#guess0").css("display", "none");
        $("#guess1").css("display", "none");
        $("#counter").css("display", "none");
        $("#tryagain").css("display", "block");

    }

    function showQuestion() {
        //Show question and answers
        $("#question").text(questions[current].question);
        $("#guess0").text(questions[current].answers[0].content);
        $("#guess1").text(questions[current].answers[1].content);
        $("#progress").text("Question " + (current + 1) + " of " + numberQuestions);
    }

});





