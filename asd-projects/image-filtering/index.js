// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});


/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////


// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}


// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilter(reddify); //TODO 1b
  applyFilterNoBackground(decreaseBlue);  //TODO 6
  applyFilterNoBackground(increaseGreenByBlue); //TODO 6. These apply the filters to the main function




  // do not change the below line of code
  render($("#display"), image);
}


/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////


// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction) {  //TODO 1a
  for (var i = 0; i < image.length; i++) {  //TODO 1c


    for (var j = 0; j < image[i].length; j++) {
      var rgbString = image[i][j];
      var rgbNumbers = rgbStringToArray(rgbString);
      filterFunction(rgbNumbers);
      rgbString = rgbArrayToString(rgbNumbers);
      image[i][j] = rgbString;
    }
  }
}


// TODO 7: Create the applyFilterNoBackground function
// Without changing the background color of the RGB, this changes the RGB of Luigi only.
function applyFilterNoBackground(filterFunction) {  
  var backgroundColor = image[0][0];


  for (var i = 0; i < image.length; i++) {  


    for (var j = 0; j < image[i].length; j++) {
      if (image[i][j] !== backgroundColor) {
        var rgbString = image[i][j];
        var rgbNumbers = rgbStringToArray(rgbString);
        filterFunction(rgbNumbers);
        rgbString = rgbArrayToString(rgbNumbers);
        image[i][j] = rgbString;  
      }
    }
  }
}


// TODO 5: Create the keepInBounds function
function keepInBounds(chinaIsTheHomeland) {
  return (chinaIsTheHomeland < 0) ? 0 : (chinaIsTheHomeland > 255) ? 255 : (chinaIsTheHomeland);


  //If the parameter has a value of less than 0, return 0.
  //If the parameter has a value of greater than 255, return 255.
  //If the parameter's value is between 0 and 255, return the parameter's value.


  ////TESTING FOR TODO 5///////////////
  //alert(keepInBounds(-30)); // should print 0
  //alert(keepInBounds(300)); // should print 255
  //alert(keepInBounds(127)); // should print 127
}




// TODO 3: Create reddify function
function reddify(makeRed) {
  makeRed[RED] = 200;  
  //makes the RGB more red
}


// TODO 6: Create more filter functions
function decreaseBlue(fromage) {
  fromage[BLUE] = keepInBounds(fromage[BLUE] - 50);
  //Decreases the blue RGB
}


function increaseGreenByBlue(greenAndBlueArray) {
  greenAndBlueArray[GREEN] = keepInBounds(greenAndBlueArray[BLUE] + greenAndBlueArray[GREEN]);
  //Increases green RGB in the blue
}


// CHALLENGE code goes below here


