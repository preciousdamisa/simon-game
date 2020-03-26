const buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];

let userClickedPattern = [];

let level = 0;
let started = false;

$('.btn').click(function() {
  let userChosenColor = $(this).attr('id');

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

$(document).keydown(function() {
  if (!started) {
    nextSequence();
    started = true;
  }

  $('#level-title').text('Level ' + level);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    const audio = new Audio('wrong.mp3');
    audio.play();

    $('body').addClass('game-over');
    setTimeout(function() {
      $('body').removeClass('game-over');
    }, 200);

    $('h1').text('Game Over, Press Any Key to Restart');

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];

  level++;
  $('#level-title').text('Level ' + level);

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $('#' + randomChosenColor).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function playSound(name) {
  const audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed');

  setTimeout(function() {
    $('#' + currentColor).removeClass('pressed');
  }, 100);
}
