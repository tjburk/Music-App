// Set the initial state of the metronome
let isRunning = false;
let countTimeout, rateTimeout;
let accentClick = new Audio("/static/sounds/Perc_Castanet_hi.wav");
let defaultClick = new Audio("/static/sounds/Perc_Castanet_lo.wav");

// Get input boxes
let tempo = document.getElementById("tempo");
let rate = document.getElementById("rate");
let beats = document.getElementById("beats");
let division = document.getElementById("division");

// Set count in
let countIn = 1;

// Function to start metronome
function triggerMetronome() {
  countIn = 1;
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
    if (!checkValidity()) {
      return false;
    }
    document.getElementById("trigger_metronome").innerHTML = "Stop Exercise";
    isRunning = true;
    startCountIn(countInterval, rateInterval, beatsVal);
    return true;
  }

  // If the metronome is running, stop it
  else {
    document.getElementById("trigger_metronome").innerHTML = "Start Exercise";
    isRunning = false;
    clearTimeout(countTimeout);
    clearInterval(rateTimeout);
    return false;
  }
}

function startCountIn(countInterval, rateInterval, beatsVal){
  // Count in
  if (countIn <= beatsVal) { // Count in as many beats as time signature
    if(countIn === 1){ // Play accented beat on first click
      playClick(accentClick);
    }
    else{
      playClick(defaultClick);
    }
    countIn++;
  }
  else { // Count in is done
    startExercise(rateInterval);
    return;
  }
  countTimeout = setTimeout(startCountIn, countInterval, countInterval, rateInterval, beatsVal);
}

function startExercise(rateInterval){
  // Click according to rate
  playClick(accentClick); // First beat of exercise
  rateTimeout = setTimeout(startExercise, rateInterval, rateInterval);
}

function playClick(click){
  click.pause();
  click.currentTime = 0;
  click.play();
}