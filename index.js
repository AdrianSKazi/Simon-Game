// Ids of boxes
var boxes = ['blue','red','yellow','green'];
// List of boxes to display
var orderDisplayedList = [];
// List of boxes that have been clicked
var orderClickedList = [];

var started = false;

var level = orderDisplayedList.length;

$(document).keypress(function() {
  if (!started) {

    nextSequence();
    started = true;
  }
});

$(".box").click(function() {

  var userChosenColour = $(this).attr("id");
  orderClickedList.push(userChosenColour);

  animatePress(userChosenColour);


  checkAnswer(orderClickedList.length-1);
});

function checkAnswer(level) {

    if (orderDisplayedList[level] === orderClickedList[level]) {
      playSound("correct.wav");
      if (orderClickedList.length === orderDisplayedList.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong.wav");
      $("body").addClass("game-over");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      restartGame();
    }
}

function nextSequence() {
  orderClickedList = [];
  randomBox();
  displayLevel();
  orderDisplayedListDisplay();
}

// Random box display
function randomBox() {
  var randomBoxIndex = Math.floor(Math.random() * boxes.length);
  boxName = boxes[randomBoxIndex];
  orderDisplayedList.push(boxName);
};

function displayLevel() {
  // Display Level Function
  level++;
  $('h2').text('Level '+ level);
};

function playSound(name) {
  var audio = new Audio(name);
  audio.play();
}

// Display all boxes function
function orderDisplayedListDisplay() {
  // Display right order
  for (let i = 0; i < orderDisplayedList.length; i++) {
    setTimeout(function() {
      $('#'+orderDisplayedList[i]).animate({opacity:1}, 750);
      $('#'+orderDisplayedList[i]).animate({opacity:0.3}, 300);
    }, i*1050);

    // After each display remove inline css
    setTimeout(function() {
      $('.box').css('opacity','');
    }, (i+1)*1400);
  };
};

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Add clicked box to orderClickedList
function orderClickedListSave() {
  $(".box").click(function(event) {
        orderClickedList.push(event.target.id);
        alert(orderClickedList);
    });
};

function restartGame() {
  $('h2').text('Wrong! Try again. Press a key to start!');
  orderDisplayedList = [];
  started = false;
  level = 0;
}
