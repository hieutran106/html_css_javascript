
//Declare global variables
var numberQuestions=questions.length;
var total_score_text=document.getElementById("total_score");


var current_score;
var current_score_text=document.getElementById("curr_score");

var questionText=document.getElementById("question");
var guess0_btn=document.getElementById("guess0");
guess0_btn.addEventListener("click",function() {
    guessButtonClick(guess0_btn);
});
var guess1_btn=document.getElementById("guess1");
guess1_btn.addEventListener("click",function() {
    guessButtonClick(guess1_btn);
});

var progress_text=document.getElementById("progress");
var counter=document.getElementById("counter");

var tryagainBtn=document.getElementById("tryagain");
tryagainBtn.addEventListener("click",function(){
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
    total_score_text.innerText=numberQuestions*10;

    current_score=0;
    current_score_text.innerText=current_score;
    time=10;//10 seconds
    current=0;
    guess0_btn.style.display="block";
    guess1_btn.style.display="block";
    counter.style.display="block";
    tryagainBtn.style.display="none";
    counter.innerText=time+ " seconds remaining...";

    intervalControl=setInterval(countdown,1000);
    function countdown() {
        if (time==0) {
            //Time out
            clearInterval(intervalControl);
            console.log("Time out");
            showResult();
        } else {
            time--;
            counter.innerText=time+ " seconds remaining...";

        }
    }
}
function guessButtonClick(button) {
    console.log("Current question:"+current);
    var answer;
    if (button.id==="guess0") {
        answer=1;
    } else {
        answer=2;
    }
    console.log(answer);
    if (answer===questions[current].correctAnswer) {
        current_score+=10;
        current_score_text.innerText=current_score;
    }
    if (current<numberQuestions-1) {
        current++;
        showQuestion();
    } else {
        showResult();
    }

}
function showResult() {
    clearInterval(intervalControl);
    questionText.innerHTML="Congratulation, your score is "+current_score+"/"+numberQuestions*10;
    guess0_btn.style.display="none";
    guess1_btn.style.display="none";
    counter.style.display="none";
    tryagainBtn.style.display="block";


}
function showQuestion() {
    //Show question and answers
    questionText.innerHTML=questions[current].question;
    guess0_btn.innerText=questions[current].answers[0].content;
    guess1_btn.innerText=questions[current].answers[1].content;
    progress_text.innerText="Question "+(current+1) + " of "+numberQuestions;
}
