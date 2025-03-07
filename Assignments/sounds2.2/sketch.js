let synth1, filt, rev, polySynth;

let activeKey = null;

let keyNotes =  {
  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5'
}

let keysArray = Object.keys(keyNotes);

let feedbackSlider, wetSlider;


function setup() {
  createCanvas(400, 400)

  filt = new Tone.Filter(1500, "lowpass").toDestination();
  rev = new Tone.Reverb(2).connect(filt);
  del = new Tone.FeedbackDelay(0.2, 0.3).connect(rev)

  synth1 = new Tone.Synth({
    envelope: {
      attack: 0.1,
      decay: 0.2,
      sustain: 0.9,
      release: 0.3
    
    }
  }).connect(del)
  synth1.portamento.value = 0.5;
  polySynth = new Tone.PolySynth(Tone.Synth).connect(del);

  // sliders for sound control
  feedbackSlider = createSlider(0, 0.99, 0, 0.01);
  feedbackSlider.position(200, 220);
  feedbackSlider.input(() => { del.feedback.value = feedbackSlider.value(); });

  wetSlider = createSlider(0, 1, 0.5, 0.01);
  wetSlider.position(200, 260);
  wetSlider.input(() => { rev.wet.value = wetSlider.value(); });
}

function draw() {
  background(220);

  // piano keyboard look
  let keyWidth = width / keysArray.length;

  for (let i = 0; i < keysArray.length; i++) {
    let keyChar = keysArray[i];
    let x = i * keyWidth;

    fill(activeKey === keyChar ? 'red' : 'white'); // when key is pressed it turns red
    stroke(0);
    rect(x, 50, keyWidth, 100);

    fill(0);
    textSize(24);
    textAlign(CENTER, CENTER);
    text(keyChar.toUpperCase(), x + keyWidth / 2, 100);
  }

  fill(0);
  textSize(14);
  text("Feedback: " + feedbackSlider.value(), 200, 210);
  text("Reverb Wet: " + wetSlider.value(), 200, 250);

}

function keyPressed() {
  let pitch = keyNotes[key]
  if (pitch && key != activeKey) {
    synth1.triggerRelease();
    activeKey = key;
    synth1.triggerAttack(pitch);
  }
  
}

function keyReleased() {
  if (key === activeKey) {
    synth1.triggerRelease();
    activeKey = null;
  }
}