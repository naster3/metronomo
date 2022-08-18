import Timer from "../../js/timer.js";

const tempoDisplay = document.querySelector(".tempo");
const tempotext = document.querySelector(".tempo-text");
const DecresiontempoBtn = document.querySelector(".decrease-tempo");
const IncrementtempoBtn = document.querySelector(".increment-tempo");
const tempoSlider = document.querySelector(".slider");
const StartStopBtn = document.querySelector(".start-stop");
const SubtractBeats = document.querySelector(".subtract-beats");
const mesureCount = document.querySelector(".measures-count");
const addBeats = document.querySelector(".add-beats");

const click1 = new Audio("../click1.mp3");
const click2 = new Audio("../click2.mp3");

let bpm = 140;
let beatspermesure = 4;
let count = 0;
let isRunning = false;
let tempoTextString = "Medium";

DecresiontempoBtn.addEventListener("click", () => {
  if (bpm <= 20) {
    return;
  }
  bpm--;
  validateTempo();
  updateMetronome();
});

IncrementtempoBtn.addEventListener("click", () => {
  if (bpm >= 280) {
    return;
  }
  bpm++;
  validateTempo();
  updateMetronome();
});

tempoSlider.addEventListener("input", () => {
  bpm = tempoSlider.value;
  validateTempo();
  updateMetronome();
});

SubtractBeats.addEventListener("click", () => {
  if (beatspermesure <= 2) {
    return;
  }
  beatspermesure--;
  mesureCount.textContent = beatspermesure;
  count = 0;
});

addBeats.addEventListener("click", () => {
  if (beatspermesure >= 12) {
    return;
  }
  beatspermesure++;
  mesureCount.textContent = beatspermesure;
  count = 0;
});

StartStopBtn.addEventListener("click", () => {
  count = 0;
  if (!isRunning) {
    metronome.start();
    isRunning = true;
    StartStopBtn.textContent = "STOP";
  } else {
    metronome.stop();
    isRunning = false;
    StartStopBtn.textContent = "START";
  }
});
function updateMetronome() {
  tempoDisplay.textContent = bpm;
  tempoSlider.value = bpm;
  metronome.timeInterval = 60000 / bpm;

  if (bpm <= 40) {
    tempoTextString = "Super Slow";
  }
  if (bpm > 40 && bpm < 80) {
    tempoTextString = "Slow";
  }
  if (bpm > 80 && bpm < 120) {
    tempoTextString = "Getting there";
  }
  if (bpm > 120 && bpm < 180) {
    tempoTextString = "Nice and Steady";
  }
  if (bpm > 180 && bpm < 220) {
    tempoTextString = "Rock n' Roll";
  }
  if (bpm > 220 && bpm < 240) {
    tempoTextString = "Funky Stuff";
  }
  if (bpm > 240 && bpm < 260) {
    tempoTextString = "Relax Dude";
  }
  if (bpm > 260 && bpm <= 280) {
    tempoTextString = "Eddie Van Halen";
  }

  tempotext.textContent = tempoTextString;
}
function validateTempo() {
  if (bpm <= 20) {
    return;
  }
  if (bpm >= 280) {
    return;
  }
}

function playClick() {
  console.log(count);
  if (count === beatspermesure) {
    count = 0;
  }
  if (count === 0) {
    click1.play();
    click1.currentTime = 0;
  } else {
    click2.play();
    click2.currentTime = 0;
  }
  count++;
}

const metronome = new Timer(playClick, 60000 / bpm, { immediate: true });
