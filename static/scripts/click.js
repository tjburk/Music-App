// Set the initial state of the metronome
let isRunning = false;
let clickInterval, clickInterval2;
let click = new Audio("/static/sounds/click.mp3");

function triggerMetronome() {
  // Get Tempo from input box
  let tempo = document.getElementById("tempo").value;
  let rate = document.getElementById("rate").value;
  let beats = document.getElementById("beats").value;
  let division = document.getElementById("division").value;

  // Set the interval (in milliseconds) at which the metronome should tick
  let rateInterval = 60000 / tempo * rate * beats;
  let countInterval = 60000 / tempo;

  // If the metronome is not running, start it
  if (!isRunning) {
    document.getElementById("trigger_metronome").innerHTML = "Stop Exercise";
    isRunning = true;
    let countIn = 1;

    // Count in
    playClick();
    clickInterval = setInterval(function () {
      if (countIn <= beats) {
        playClick();
        countIn++;
      } else {
        // Clear count-in interval
        clearInterval(clickInterval);
        // Click according to rate
        clickInterval2 = setInterval(function () {
        playClick();
        }, rateInterval);
      }
    }, countInterval);
  }

  // If the metronome is running, stop it
  else {
    document.getElementById("trigger_metronome").innerHTML = "Start Exercise";
    isRunning = false;
    clearInterval(clickInterval);
    clearInterval(clickInterval2);
  }
}

function playClick(){
  click.play();
  click.currentTime = 0;
}