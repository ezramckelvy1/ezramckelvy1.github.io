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
    W: 87,
    A: 65,
    S: 83,
    D: 68,
  }
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  // Game Item Objects
  var walker = {
    PosX: 350,
    SpeedX: 0,
    PosY: 350,
    SpeedY: 0,
    tagged: true,
    color: "Red",
  }
  var walkerTwo = {
    PosX: 0,
    SpeedX: 0,
    PosY: 0,
    SpeedY: 0,
    tagged: false,
    color: "Teal",
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
    walkerColor()
    repositionGameItem()
    walkerCollision()
    wallCollision()
    redrawGameItem()
  }

  /* 
  Called in response to events.
  */


  function handleKeyUp(event) {
    
    //first walker//
    if (event.which === KEY.LEFT) {
      walker.SpeedX = 0

    }
    if (event.which === KEY.RIGHT) {  
      walker.SpeedX = 0
    }
    if (event.which === KEY.UP) {
      walker.SpeedY = 0
    }
    if (event.which === KEY.DOWN) {
      walker.SpeedY = 0
    }
    //second walker//
    if (event.which === KEY.A) {
      walkerTwo.SpeedX = 0
    }
    if (event.which === KEY.D) {
      walkerTwo.SpeedX = 0
    }
    if (event.which === KEY.W) {
      walkerTwo.SpeedY = 0
    }
    if (event.which === KEY.S) {
      walkerTwo.SpeedY = 0
    }

  }
  
  function handleKeyDown(event) {

    //first walker//
    if (event.which === KEY.LEFT) {
      walker.SpeedX = walker.tagged ? -3 : -5

    }
    if (event.which === KEY.RIGHT) {
      walker.SpeedX = walker.tagged ? 3 : 5
    }
    if (event.which === KEY.UP) {
      walker.SpeedY = walker.tagged ? -3 : -5
    }
    if (event.which === KEY.DOWN) {
      walker.SpeedY = walker.tagged ? 3 : 5
    }
    //second walker//
    if (event.which === KEY.A) {
      walkerTwo.SpeedX = walkerTwo.tagged ? -3 : -5
    }
    if (event.which === KEY.D) {
      walkerTwo.SpeedX = walkerTwo.tagged ? 3 : 5
    }
    if (event.which === KEY.W) {
      walkerTwo.SpeedY = walkerTwo.tagged ? -3 : -5
    }
    if (event.which === KEY.S) {
      walkerTwo.SpeedY = walkerTwo.tagged ? 3 : 5
    }

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function walkerCollision() {
    if (walker.PosX + 45 >= walkerTwo.PosX &&
      walker.PosX <= walkerTwo.PosX + 45 &&
      walker.PosY + 45 >= walkerTwo.PosY &&
      walker.PosY <= walkerTwo.PosY + 45) {
      tagged()
      colorChange()


    }
  }

  function colorChange() {
    if (walker.color === "Red") {
      walker.color = "Teal"
      walkerTwo.color = "Red"
    } else {
      walkerTwo.color = "Teal"
      walker.color = "Red"
    }
  }
  function walkerColor() {
    $("#walker").css("background-color", walker.color)
    $("#walkerTwo").css("background-color", walkerTwo.color)
  }
  function tagged() {
    if (walker.tagged) {
      walker.tagged = false
      walkerTwo.tagged = true

      posReset()
    } else {
      walker.tagged = true
      walkerTwo.tagged = false
      posReset()
    }
  }
  function posReset() {
    walker.PosX = 350
    walker.PosY = 350
    walkerTwo.PosX = 0
    walkerTwo.PosY = 0
  }
  function wallCollision() {
    //walker
    if (walker.PosX < 0) {
      walker.PosX -= walker.SpeedX
    }
    if (walker.PosY < 0) {
      walker.PosY -= walker.SpeedY
    }
    if (walker.PosX >= $("#board").width() - 45) {
      walker.PosX -= walker.SpeedX
    }
    if (walker.PosY >= $("#board").height() - 45) {
      walker.PosY -= walker.SpeedY
    }
    //walker two
    if (walkerTwo.PosX < 0) {
      walkerTwo.PosX -= walkerTwo.SpeedX
    }
    if (walkerTwo.PosY < 0) {
      walkerTwo.PosY -= walkerTwo.SpeedY
    }
    if (walkerTwo.PosX >= $("#board").width() - 45) {
      walkerTwo.PosX -= walkerTwo.SpeedX
    }
    if (walkerTwo.PosY >= $("#board").height() - 45) {
      walkerTwo.PosY -= walkerTwo.SpeedY
    }
  }
  function repositionGameItem() {
    walker.PosX += walker.SpeedX
    walker.PosY += walker.SpeedY
    walkerTwo.PosX += walkerTwo.SpeedX
    walkerTwo.PosY += walkerTwo.SpeedY
  }
  function redrawGameItem() {
    $("#walker").css("left", walker.PosX)
    $("#walker").css("top", walker.PosY)
    $("#walkerTwo").css("left", walkerTwo.PosX)
    $("#walkerTwo").css("top", walkerTwo.PosY)
  }
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}
