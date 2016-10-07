/**
 * Created by Hagar Shilo on 7/9/2016.
 */

"use strict";

$.ajaxSetup({
    async: false
});

var correctAnswers = [];
var userAnswers = new Array(10);

function calcScore(){
    for(var score=0, i=0; i<10; i++){
    if (correctAnswers[i] === userAnswers[i]){
        score++;
        }
    }
    $("#score").text("Your score is: "+score);
}

$(function(){

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

$.getJSON("Quiz.JSON", function (content){
    questionList = shuffle(content).slice(0, 10);
    for (var i=0; i<10; i++) {
        correctAnswers.push(questionList[i]['correct answer']);        
    }
});

function showQuestion(){
    //guarantee all answers are unchecked
    $("#answer1button").prop("checked", false);
    $("#answer2button").prop("checked", false);
    $("#answer3button").prop("checked", false);
    $("#answer4button").prop("checked", false);

    var q1 = questionList[clickCount];
    $('#question').text(q1['question']);

    var answerz = [
        q1['correct answer'],
        q1['wrong answers'][0],
        q1['wrong answers'][1],
        q1['wrong answers'][2]
    ];

        shuffle(answerz);

        $('#answer1').text(answerz[0]);
        $('#answer2').text(answerz[1]);
        $('#answer3').text(answerz[2]);
        $('#answer4').text(answerz[3]);
}

var clickCount = 0;
showQuestion();
$("#bt_next").show();
$("#bt_prev").hide();
$("#bt_score").hide();

$("#bt_next").click(function(){
    clickCount+=1;
    showQuestion();
    $("#bt_prev").show();
    $("#bt_next").show();
    $("#bt_score").hide();
    
    if (clickCount === 9) {
    $("#bt_score").show();
    $("#bt_next").hide();
    }
}
);

$("#bt_prev").click(function(){
    clickCount-=1;
    showQuestion();
    $("#bt_prev").show();
    $("#bt_next").show();
    $("#bt_score").hide();
    
    if (clickCount === 0) {
    
    $("#bt_prev").hide();
    }
}
);

var currentQuestion = 0;

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

});