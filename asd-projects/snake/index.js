/* global $, sessionStorage*/


////////////////////////////////////////////////////////////////////////////////
///////////////////////// VARIABLE DECLARATIONS ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


// HTML jQuery Objects
var board = $("#board");
var scoreElement = $("#score");
var highScoreElement = $("#highScore");


// TODO 4a: Create the snake, apple and score variables
// Game Variables
var snake = {}
var apple = {}
var score = 0
// Constant Variables
var ROWS = 20;
var COLUMNS = 20;
var SQUARE_SIZE = 20;
var KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};


// interval variable required for stopping the update function when the game ends
var updateInterval;


// variable to keep track of the key (keycode) last pressed by the user
var activeKey;


////////////////////////////////////////////////////////////////////////////////
////////////////////////////// GAME SETUP //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


// TODO: turn on keyboard inputs
$("body").on("keydown", handleKeyDown);


// start the game
init();


function init() {
  // TODO 4c-2: initialize the snake
  // initialize the snake's body as an empty Array
  snake.body = [];
  // make the first snakeSquare and set it as the head
  makeSnakeSquare(10, 10);
  snake.head = snake.body[0];
  // TODO 4b-2: initialize the apple
  makeApple();
  // TODO 5a: Initialize the interval
  // start update interval
  updateInterval = setInterval(update, 100);


}


////////////////////////////////////////////////////////////////////////////////
///////////////////////// PROGRAM FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


/*
 * On each update tick update each bubble's position and check for
 * collisions with the walls.
 */
function update() {
  // TODO 5b: Fill in the update function's code block
  moveSnake();


  if (hasHitWall() || hasCollidedWithSnake()) {
    endGame();
  }


  if (hasCollidedWithApple()) {
    handleAppleCollision();
  }
}


function checkForNewDirection(event) {
  /*
  TODO 6b: Update snake.head.direction based on the value of activeKey.
 
  BONUS: Only allow direction changes to take place if the new direction is
  perpendicular to the current direction
  */


  if (activeKey === KEY.LEFT) {
    snake.head.direction = "left";
  }
  if (activeKey === KEY.RIGHT) {
    snake.head.direction = "right";
  }
  if (activeKey === KEY.DOWN) {
    snake.head.direction = "down";
  }
  if (activeKey === KEY.UP) {
    snake.head.direction = "up";
  }


  // FILL IN THE REST


  console.log(snake.head.direction);
}


function moveSnake() {
  /*
  TODO 11: Move each part of the snake's body such that it's body follows the head.
 
  HINT: To complete this TODO we must figure out the next direction, row, and
  column for each snakeSquare in the snake's body. The parts of the snake are
  stored in the Array snake.body and each part knows knows its current
  column/row properties.
  */
  for (var i = snake.body.length - 1; i > 0; i--) {
    var snakeSquare = snake.body[i];


    var nextSnakeSquare = snake.body[i - 1];


    snakeSquare.direction = nextSnakeSquare.direction;
    snakeSquare.row = nextSnakeSquare.row;
    snakeSquare.column = nextSnakeSquare.column;
    repositionSquare(snakeSquare);
  }


  //Before moving the head, check for a new direction from the keyboard input
  checkForNewDirection();




  // TODO 7: determine the next row and column for the snake's head


  // HINT: The snake's head will need to move forward 1 square based on the value
  // of snake.head.direction which may be one of "left", "right", "up", or "down"


  if (snake.head.direction === "left") {
    snake.head.column = snake.head.column - 1;
  }
  repositionSquare(snake.head);


  if (snake.head.direction === "right") {
    snake.head.column = snake.head.column + 1;
  }
  repositionSquare(snake.head);


  if (snake.head.direction === "down") {
    snake.head.row = snake.head.row + 1;
  }
  repositionSquare(snake.head);


  if (snake.head.direction === "up") {
    snake.head.row = snake.head.row - 1;
  }
  repositionSquare(snake.head);
}


function hasHitWall() {
  /*
  TODO 8: Should return true if the snake's head has collided with the four walls of the
  board, false otherwise.
 
  HINT: What will the row and column of the snake's head be if this were the case?
  */
  // the current column of snake.head
  if (snake.head.row > ROWS) {
    return true
  }


  if (snake.head.column > COLUMNS) {
    return true
  }


  if (snake.head.row < 0) {
    return true;
  }


  if (snake.head.column < 0) {
    return true;
  }


  return false;




}


function hasCollidedWithApple() {
  /*
  TODO 9: Should return true if the snake's head has collided with the apple,
  false otherwise
 
  HINT: Both the apple and the snake's head are aware of their own row and column
  */


  if (snake.head.row === apple.row) {
    if (snake.head.column === apple.column) {
      return true
    }
  }
  return false;
}


function handleAppleCollision() {
  // increase the score and update the score DOM element
  score++;
  scoreElement.text("Score: " + score);


  // Remove existing Apple and create a new one
  apple.element.remove();
  makeApple();


  /*
  TODO 10: determine the location of the next snakeSquare based on the .row,
  .column and .direction properties of the snake.tail snakeSquare
 
  HINT: snake.tail.direction will be either "left", "right", "up", or "down".
  If the tail is moving "left", place the next snakeSquare to its right.
  If the tail is moving "down", place the next snakeSquare above it.
  etc...
  */
  var row = 0;
  var column = 0;


  if (snake.tail.direction === "left") {
    row = snake.head.row
    column = snake.head.column + 1
  }
  if (snake.tail.direction === "right") {
    row = snake.head.row
    column = snake.head.column - 1
  }
  if (snake.tail.direction === "up") {
    row = snake.head.row + 1
    column = snake.head.column
  }
  if (snake.tail.direction === "down") {
    row = snake.head.row - 1
    column = snake.head.column
  }
  // code to determine the row and column of the snakeSquare to add to the snake


  makeSnakeSquare(row, column);
}


function hasCollidedWithSnake() {
  /*
  TODO 12: Should return true if the snake's head has collided with any part of the
  snake's body.
 
  HINT: Each part of the snake's body is stored in the snake.body Array. The
  head and each part of the snake's body also knows its own row and column.
  */
  for (var i = snake.body.length - 1; i > 0; i--) {
    if (snake.head.row === snake.body[i].row) {
      if (snake.head.column === snake.body[i].column){
        return true
      }
    }
  }


  return false;
}


   


function endGame() {
  // stop update function from running
  clearInterval(updateInterval);


  // clear board of all elements
  board.empty();


  // update the highScoreElement to display the highScore
  highScoreElement.text("High Score: " + calculateHighScore());
  scoreElement.text("Score: 0");
  score = 0;


  // restart the game after 500 ms
  setTimeout(init, 500);
}


////////////////////////////////////////////////////////////////////////////////
////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


/* Create an HTML element for the apple using jQuery. Then find a random
 * position on the board that is not occupied and position the apple there.
 */
function makeApple() {
  // make the apple jQuery Object and append it to the board
  apple.element = $("<div>").addClass("apple").appendTo(board);


  // get a random available row/column on the board
  var randomPosition = getRandomAvailablePosition();


  // initialize the row/column properties on the Apple Object
  apple.row = randomPosition.row;
  apple.column = randomPosition.column;


  // position the apple on the screen
  repositionSquare(apple);
}


/* Create an HTML element for a snakeSquare using jQuery. Then, given a row and
 * column on the board, position it on the screen. Finally, add the new
 * snakeSquare to the snake.body Array and set a new tail.
 */
function makeSnakeSquare(row, column) {
  // initialize a new snakeSquare Object
  var snakeSquare = {};


  // make the snakeSquare.element Object and append it to the board
  snakeSquare.element = $("<div>").addClass("snake").appendTo(board);


  // initialize the row and column properties on the snakeSquare Object
  snakeSquare.row = row;
  snakeSquare.column = column;


  // set the position of the snake on the screen
  repositionSquare(snakeSquare);


  // if this is the head, add the snake-head id
  if (snake.body.length === 0) {
    snakeSquare.element.attr("id", "snake-head");
  }


  // add snakeSquare to the end of the body Array and set it as the new tail
  snake.body.push(snakeSquare);
  snake.tail = snakeSquare;
}


/*
  event.which returns the keycode of the key that is pressed when the
  keydown event occurs
 
  The KEY Object creates a map for the Arrow Keys to their keycode:


    KEY.LEFT = 37
    KEY.UP = 38
    KEY.RIGHT = 39
    KEY.DOWN = 40
*/
function handleKeyDown(event) {
  // TODO 6a: make the handleKeyDown function register which key is pressed
  activeKey = event.which;
  console.log(activeKey);
}


/* Given a gameSquare (which may be a snakeSquare or the apple), position
 * the gameSquare on the screen.
 */
function repositionSquare(square) {
  var squareElement = square.element;
  var row = square.row;
  var column = square.column;


  var buffer = 20;


  // position the square on the screen according to the row and column
  squareElement.css("left", column * SQUARE_SIZE + buffer);
  squareElement.css("top", row * SQUARE_SIZE + buffer);
}


/* Returns a (row,column) Object that is not occupied by another game component
 */
function getRandomAvailablePosition() {
  var spaceIsAvailable;
  var randomPosition = {};


  for (var i = 0; i < snake.body.length; i++) {
    if (randomPosition.row === snake.body[i].row) {
      if (randomPosition.column === snake.body[i].column){
        return true
      }
    }
  }
  /* Generate random positions until one is found that doesn't overlap with the snake */
  while (!spaceIsAvailable) {
    randomPosition.column = Math.floor(Math.random() * COLUMNS);
    randomPosition.row = Math.floor(Math.random() * ROWS);
    spaceIsAvailable = true;


    /*
    TODO 13: After generating the random position determine if that position is
    not occupied by a snakeSquare in the snake's body. If it is then set
    spaceIsAvailable to false so that a new position is generated.
    */
  }


  return randomPosition;
}


function calculateHighScore() {
  // retrieve the high score from session storage if it exists, or set it to 0
  var highScore = sessionStorage.getItem("highScore") || 0;


  if (score > highScore) {
    sessionStorage.setItem("highScore", score);
    highScore = score;
    alert("New High Score!");
  }


  return highScore;
}



