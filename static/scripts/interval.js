// Setting up initial state of the interval exercise
let is_running = false;
let selected_intervals = [];
let trigger_interval = document.getElementById("trigger_interval");
let answers_text = document.getElementById("answers_text");
let answer_section = document.getElementById("answer_section");
let select_mode = document.getElementById("select_mode");
let repeat_button = document.getElementById("repeat");

let random_note_val = 0;
let next_note_val = 0;
let interval = 0;

function triggerInterval(){
    if(selected_intervals.length === 0){
        alert("No intervals selected");
        return 0;
    }
    if(selected_intervals.length === 1){
        alert("You must select more than one interval group")
        return 0;
    }
    // Start exercise
    if (!is_running) {
        // Changes button to "Stop" and sets running to true
        trigger_interval.innerHTML = "Stop Exercise";
        is_running = true;
        answer_section.style.display = "block"; // Makes answer section visible when running
        repeat_button.style.visibility = "visible"; // Makes repeat button visible when running

        startExercise(0);
    }
    // Stop exercise
    else {
        // Changes button to "Start" and sets running to false
        trigger_interval.innerHTML = "Start Exercise";
        is_running = false;

        answer_section.style.display = "none"; // Hides answer section when not running
        repeat_button.style.visibility = "hidden"; // Hides repeat button when not running
    }
}

// Pass number of half steps between two notes (Ex: 4 = Maj 3)
function selectInterval(steps){
    // Exercise is not currently in progress, let the user select intervals
    if(!is_running) {
        let interval_choice = document.getElementById(steps);
        let interval_display = document.getElementById(steps + " display");

        // Interval already selected (value 0 = unselected, value 1 = selected)
        if (Number(interval_choice.value) === 1) {
            // Remove interval from list of selected intervals
            let index = selected_intervals.indexOf(steps); // Get index
            if(index > -1){ // If interval is in list
                selected_intervals.splice(index, 1); // Delete one element at the location
            }
            else{
                alert("That interval doesn't exist.")
            }
            // Reset interval choice color and value
            interval_choice.style.background = ""; // Empty in order to preserve hover (if "white", then hover goes away)
            interval_choice.value = 0; // Unselect

            // Hide interval display box
            interval_display.hidden = true;
        }
        // Interval not selected
        else {
            // Add interval to list of selected intervals
            selected_intervals.push(steps);
            // Set interval choice color and value to grey and 1 respectfully
            interval_choice.style.background = "#c0c0c0"; // Set to grey
            interval_choice.value = 1; // Set to running

            // Display interval display box
            interval_display.hidden = false;
        }

        // Display "answer choices" text 1 or more intervals are selected
        if(selected_intervals.length >= 1) {
            answers_text.style.visibility = "visible";
        }
        else {
            answers_text.style.visibility = "hidden";
        }
    }
    // Exercise is in progress
    else {
        alert("You cannot change interval selection during the exercise")
    }
}

async function startExercise(answer){
    // Selected interval choice
    let display_id = answer + " display";
    let selected = document.getElementById(display_id);

    // Correct interval choice
    let correct_id = interval + " display";
    let correct = document.getElementById(correct_id);

    if(answer !== 0){ // 0 = First time starting exercise (no answer selected)
        if(answer === interval){ // Answer is correct
            selected.style.backgroundColor = "green"; // Set selected answer selection background to green
        }
        else{ // Answer is incorrect
            selected.style.backgroundColor = "red"; // Set selected answer selection background to red
            correct.style.backgroundColor = "green"; // Set correct answer selection background to green
        }

        await sleep(1000); // Wait one second
        selected.style.backgroundColor = ""; // Reset selected background
        correct.style.backgroundColor = ""; // Reset correct background
    }


    // Get a random one of the selected intervals
    let random_index = Math.floor(Math.random() * selected_intervals.length); // If length is 3, returns 0, 1, or 2
    interval = selected_intervals[random_index];
    if(select_mode.value === "Ascending"){
        // Get a random starting note
        random_note_val = Math.floor(Math.random() * (24 - interval)) + 1; // Random number 1 to (24 - interval range)
        playKey(random_note_val);

        // Do nothing for 1 second
        await sleep(1000);

        next_note_val = random_note_val + interval;
        playKey(next_note_val);
    }
    else if(select_mode.value === "Descending"){
        // Get a random starting note
        random_note_val = Math.floor(Math.random() * (24 - interval)) + interval; // Random number interval range to 24
        playKey(random_note_val);

        // Do nothing for 1 second
        await sleep(1000);

        next_note_val = random_note_val - interval;
        playKey(next_note_val);
    }

    else if(select_mode.value === "Concurrent"){
        // Get a random starting note
        random_note_val = Math.floor(Math.random() * (24 - interval)) + 1; // Random number 1 to (24 - interval range)
        playKey(random_note_val);

        // No sleep

        next_note_val = random_note_val + interval;
        playKey(next_note_val);
    }
}

async function repeat(){   // Keys are already assigned to global variables
    if(select_mode.value === "Ascending" || select_mode.value === "Descending"){
        playKey(random_note_val);
        await sleep(1000); // Do nothing for 1 second
        playKey(next_note_val);
    }
    else if(select_mode.value === "Concurrent"){
        playKey(random_note_val);
        playKey(next_note_val);
    }
}

function playKey(number){
    let path = "/static/sounds/piano_keys/key" + number + ".mp3"; // Get new path for the key
    let key = new Audio(path);
    key.currentTime = 0;
    key.play();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}