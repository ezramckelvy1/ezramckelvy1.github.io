/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var KEY = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
  }
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  // Game Item Objects
  var walker = {
    PosX: 0,
    SpeedX: 0,
    PosY: 0,
    SpeedY: 0,
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem()
    wallCollision()
    redrawGameItem()
  }

  /* 
  Called in response to events.
  */
  function handleKeyUp(event) {
    walker.SpeedX = 0
    walker.SpeedY = 0
  }
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      walker.SpeedX = -5
    }
    if (event.which === KEY.RIGHT) {
      walker.SpeedX = 5
    }
    if (event.which === KEY.UP) {
      walker.SpeedY = -5
    }
    if (event.which === KEY.DOWN) {
      walker.SpeedY = 5
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function wallCollision() {
    if (walker.PosX < 0) {
      walker.PosX -= walker.SpeedX
    }
    if (walker.PosY < 0) {
      walker.PosY -= walker.SpeedY
    }
    if (walker.PosX >= $("#board").width()-45) {
      walker.PosX -= walker.SpeedX
    }
    if (walker.PosY >= $("#board").height()-45) {
      walker.PosY -= walker.SpeedY
    }
  }
  function repositionGameItem() {
    walker.PosX += walker.SpeedX
    walker.PosY = walker.PosY + walker.SpeedY
  }
  function redrawGameItem() {
    $("#walker").css("left", walker.PosX)
    $("#walker").css("top", walker.PosY)
  }
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}
