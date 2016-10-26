/**
 * Created by Hagar Shilo on 7/9/2016.
 */

"use strict";

$.ajaxSetup({
    async: false
});

// store the correct answers in an array
var correctAnswers = [];
// Store answers picked by the user in an array
var userAnswers = new Array(10);

// BIG FUNCTION
$(function(){

  // Shuffle function
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

// The questionList variable is a subset of the fullQuestionList variable
var fullQuestionList, questionList;

  // Create a subset of fullQuestionList with only 10 questions
  $.getJSON("quiz.json", function (content){
      questionList = shuffle(content).slice(0, 10);
      for (var i=0; i<10; i++) {
          // PLUS a matching array of those questions' correct answers
          correctAnswers.push(questionList[i]['correct answer']);
      }
  });

  function showQuestion(){

    // Make sure all answers are unchecked when a new question is displayed
    $("#answer1button").prop("checked", false);
    $("#answer2button").prop("checked", false);
    $("#answer3button").prop("checked", false);
    $("#answer4button").prop("checked", false);
    $("input[type='radio']").checkboxradio("refresh");

    //questionList now contains 10 questions, the current one goes into q
    var q = questionList[clickCount];

    // Display question...
    $('#question').text(q['question']);

    // Get its answers...
    var answersToShow = [
        q['correct answer'],
        q['wrong answers'][0],
        q['wrong answers'][1],
        q['wrong answers'][2]
    ];

        // Shuffle answers and display them
        shuffle(answersToShow);
        $('#answer1').text(answersToShow[0]);
        $('#answer2').text(answersToShow[1]);
        $('#answer3').text(answersToShow[2]);
        $('#answer4').text(answersToShow[3]);
  }

// Counter initialized
var clickCount = 0;

// Start a session by displaying a question
showQuestion();
$("#bt_next").show(); // Only Next is visible when session starts
$("#bt_prev").hide(); // The other buttons are hidden
$("#bt_score").hide();
$("#bt_again").hide();

  // When the user goes back/forward
  $("#bt_next").click(function(){
      // Counter tacks the user's forward steps
      clickCount+=1;
      showQuestion();
      // When counter>0 we've past the fisrt question,
      // so Previous should be displayed
      $("#bt_prev").show();
      $("#bt_next").show();
      // while other buttons remain hidden
      $("#bt_score").hide();
      $("#bt_again").hide();

      // When the user gets to the last (10th) question, the next button disappears
      // and the Show Score button is displayed
      if (clickCount === 9) {
      $("#bt_score").show();
      $("#bt_next").hide();
      }
  });

  // When user goes back...
  $("#bt_prev").click(function(){
      // Counter tacks the steps back
      clickCount-=1;
      showQuestion();
      $("#bt_prev").show();
      $("#bt_next").show();
      $("#bt_score").hide();
      $("#bt_again").hide();

      // When user gets to 1st question, hide the Back button
      if (clickCount === 0) {
      $("#bt_prev").hide();
      }
  });

  // Record the user's answer for all 4 possible choices
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

// Calculate and show the score
function calcScore(){
    // The user gets a point for each "user answer" that matches a "correct answer"
    for(var score=0, i=0; i<10; i++){
    if (correctAnswers[i] === userAnswers[i]){
        score++;
        }
    }

    // Show calculated score and Try Again button
    $("#score").html("</br>Your result is</br></br>"+score+" of 10</br></br>");
    $("#bt_again").show();

    // Hide these elements when score is presented
    $("#bt_score").hide();
    $("#bt_prev").hide();
    $("#questions").hide();
}
