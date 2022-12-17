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

// Get count in boxes
let count_text = document.getElementById("count_text");
let count_1 = document.getElementById("count_1");
let count_2 = document.getElementById("count_2");
let count_3 = document.getElementById("count_3");
let count_4 = document.getElementById("count_4");

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
    // Changes button to "Stop"
    document.getElementById("trigger_metronome").innerHTML = "Stop Exercise";

    // Set metronome to running
    isRunning = true;

    // Count-in text appears
    count_text.style.visibility = 'visible';
    startCountIn(countInterval, rateInterval, beatsVal); // Starts metronome

    return true;
  }

  // If the metronome is running, stop it
  else {
    // Hide all text
    count_text.style.visibility = 'hidden';
    count_1.style.visibility = 'hidden';
    count_2.style.visibility = 'hidden';
    count_3.style.visibility = 'hidden';
    count_4.style.visibility = 'hidden';

    // Change button back to "Start"
    document.getElementById("trigger_metronome").innerHTML = "Start Exercise";

    // Set boolean
    isRunning = false;

    // Clear timers (stop the clicking)
    clearTimeout(countTimeout);
    clearInterval(rateTimeout);

    return false;
  }
}

function startCountIn(countInterval, rateInterval, beatsVal){
  count_text.innerHTML = 'Count In';
  // Start loop
  if (countIn <= beatsVal) { // Count in as many beats as time signature
    if(countIn === 1){ // Play accented beat on first click
      playClick(accentClick);
      count_1.style.visibility = 'visible';
      count_1.innerHTML = countIn;
    }
    else{
      // Which count in element should be displayed?
      if(countIn % 4 === 1){ // for 5/X and higher
        count_4.style.visibility = 'hidden';
        count_1.innerHTML = countIn;
        count_1.style.visibility = 'visible';
      }
      if(countIn % 4 === 2){
        count_1.style.visibility = 'hidden';
        count_2.innerHTML = countIn;
        count_2.style.visibility = 'visible';
      }
      if(countIn % 4 === 3){
        count_2.style.visibility = 'hidden';
        count_3.innerHTML = countIn;
        count_3.style.visibility = 'visible';
      }
      if(countIn % 4 === 0){
        count_3.style.visibility = 'hidden';
        count_4.innerHTML = countIn;
        count_4.style.visibility = 'visible';
      }
      playClick(defaultClick);
    }
    countIn++;
  }
  else { // Count in is done
    // Hide the count in
    count_1.style.visibility = 'hidden';
    count_2.style.visibility = 'hidden';
    count_3.style.visibility = 'hidden';
    count_4.style.visibility = 'hidden';
    // Prepare Clap animation
    count_text.innerHTML = 'Clap!';
    count_text.style.opacity = '0';
    startExercise(rateInterval);
    return;
  }
  countTimeout = setTimeout(startCountIn, countInterval, countInterval, rateInterval, beatsVal);
}

function startExercise(rateInterval){
  // Click according to rate
  playClick(accentClick); // First beat of exercise

  // Animation
  count_text.style.animation = '';
  void count_text.offsetWidth; // Trigger DOM event to reset animation
  count_text.style.animation = "fadeOut 2s";

  // Timeout
  rateTimeout = setTimeout(startExercise, rateInterval, rateInterval);
}

function playClick(click){
  click.pause();
  click.currentTime = 0;
  click.play();
}