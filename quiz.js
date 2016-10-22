/**
 * Created by Hagar Shilo on 7/9/2016.
 */

"use strict";

$.ajaxSetup({
    async: false
});

// Here we'll store the correct answers and the answers picked by the user
var correctAnswers = [];
var userAnswers = new Array(10);

// Calculate and show the score
// The user gets a point for each "user answer" that matches a "correct answer"
function calcScore(){
    for(var score=0, i=0; i<10; i++){
    if (correctAnswers[i] === userAnswers[i]){
        score++;
        }
    }
    // Show the calculated score and new button-s
    $("#score").html("YOUR SCORE: </br>"+score);
    $("#bt_again").show();
    // And remove several elements as the score is presented
    $("#bt_score").hide();
    $("#bt_prev").hide();
    $("#questions").hide();
}

// BIG FAT FUNCTION
$(function(){
// General shuffle function
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

var fullQuestionList, questionList;

$.getJSON("quiz.json", function (content){
    questionList = shuffle(content).slice(0, 10);
    for (var i=0; i<10; i++) {
        correctAnswers.push(questionList[i]['correct answer']);
    }
});

function showQuestion(){
    // Make sure all answers are unchecked when a new question is displayed
    $("#answer1button").prop("checked", false);
    $("#answer2button").prop("checked", false);
    $("#answer3button").prop("checked", false);
    $("#answer4button").prop("checked", false);

    // What is this variable?
    var q = questionList[clickCount];
    $('#question').text(q['question']);

    // What's happening?
    var answerz = [
        q['correct answer'],
        q['wrong answers'][0],
        q['wrong answers'][1],
        q['wrong answers'][2]
    ];

        // Shuffle the answers
        shuffle(answerz);

        // Set the questions' order by inserting the shuffled answers into each
        // of the 4 places
        $('#answer1').text(answerz[0]);
        $('#answer2').text(answerz[1]);
        $('#answer3').text(answerz[2]);
        $('#answer4').text(answerz[3]);
}

// When the session starts, the counter is set to 0
var clickCount = 0;
showQuestion();
$("#bt_next").show();
// When the 1st question is displayed, these buttons are hidden
$("#bt_prev").hide();
$("#bt_score").hide();
$("#bt_again").hide();


// Handle cases where the user goes back/forward
$("#bt_next").click(function(){
    // Here the counter tacks the user's steps forwards
    clickCount+=1;
    showQuestion();
    // When counter>0 that means we're past the fisrt question,
    // and therefore the Back/previous button should be displayed
    $("#bt_prev").show();
    $("#bt_next").show();
    $("#bt_score").hide();
    $("#bt_again").hide();

    // When the user gets to the last (10th) question, the next button disappears
    // and the Show Score button is displayed
    if (clickCount === 9) {
    $("#bt_score").show();
    $("#bt_next").hide();
    }
}
);

// Handle cases where the user goes back
$("#bt_prev").click(function(){
    // Here the counter tacks the user's steps backwards
    clickCount-=1;
    showQuestion();
    $("#bt_prev").show();
    $("#bt_next").show();
    $("#bt_score").hide();
    $("#bt_again").hide();

    // When user returns to 1st question, hide the Back button
    if (clickCount === 0) {
    $("#bt_prev").hide();
    }
}
);

var currentQuestion = 0;
// What's going on here?
$('#answer1button').click(function() {
    userAnswers[clickCount] = ($('#answer1').text());
});

$('#answer2button').click(function() {
    userAnswers[clickCount] = ($('#answer2').text());
});

$('#answer3button').click(function() {
    userAnswers[clickCount] = ($('#answer3').text());
});

$('#answer4button').click(function() {
    userAnswers[clickCount] = ($('#answer4').text());
});

}); // End of big function
