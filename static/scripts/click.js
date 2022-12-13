// Set the initial state of the metronome
let isRunning = false;
let clickInterval, clickInterval2;
let accentClick = new Audio("/static/sounds/Perc_Castanet_hi.wav");
let defaultClick = new Audio("/static/sounds/Perc_Castanet_lo.wav");

// Get input boxes
let tempo = document.getElementById("tempo");
let rate = document.getElementById("rate");
let beats = document.getElementById("beats");
let division = document.getElementById("division");

// Function to start metronome
function triggerMetronome() {
  // Get parameters from input boxes
  let tempoVal = tempo.value;
  let rateVal = rate.value;
  let beatsVal = beats.value;
  let divisionVal = division.value;

  // Set the interval (in milliseconds) at which the metronome should tick
  let rateInterval = 60000 / tempoVal * rateVal * beatsVal;
  let countInterval = 60000 / tempoVal; // For count-in

  // If the metronome is not running, start it
  if (!isRunning) {
    if(!checkValidity()){
      return false;
    }
    document.getElementById("trigger_metronome").innerHTML = "Stop Exercise";
    isRunning = true;
    let countIn = 1;

    // Count in
    playClick(accentClick); // First beat of count in
    clickInterval = setInterval(function () {
      if (countIn < beatsVal) {
        playClick(defaultClick);
        countIn++;
      } else {
        // Clear count-in interval
        clearInterval(clickInterval);

        // Click according to rate
        playClick(accentClick); // First beat of exercise
        clickInterval2 = setInterval(function () {
          playClick(accentClick);
        }, rateInterval);
      }
    }, countInterval);
    return true;
  }

  // If the metronome is running, stop it
  else {
    document.getElementById("trigger_metronome").innerHTML = "Start Exercise";
    isRunning = false;
    clearInterval(clickInterval);
    clearInterval(clickInterval2);
    return false;
  }
}

function playClick(click){
  click.play();
  click.currentTime = 0;
}