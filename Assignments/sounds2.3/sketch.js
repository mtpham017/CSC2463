let synth, filter, lfo, panner;
let coinImage;
let showCoin = false; 

function preload() {
  coinImage = loadImage("media/coinImage.png");
}

function setup() {
  createCanvas(400, 400);
  panner = new Tone.AutoPanner({
    frequency: 0.5,
    depth: 1,
  }).toDestination().start();
  
  filter = new Tone.Filter({
    frequency: 1500,
    type: "highpass",
    Q: 8,
  }).connect(panner);
  
  // synth to create the coin sound
  synth = new Tone.Synth({
    oscillator: {
      type: "square"
    },
    envelope: {
      attack: 0.01,
      decay: 0.1,
      sustain: 0,
      release: 0.1
    }
  }).connect(filter);
  
  lfo = new Tone.LFO(5, 1000, 3000).connect(filter.frequency).start();
}

function draw() {
  background(220);
  
  if (showCoin) {
    image(coinImage, 0, 0, width, height);
  } else {
    textSize(16);
    textAlign(CENTER, CENTER);
    fill(0);
    text("Click for Coin", width / 2, height / 2);
  }
}

function mouseClicked() {
  showCoin = true; 
  
  // trigger coin sound
  synth.triggerAttackRelease(1200, 0.1);
  synth.triggerAttackRelease(1500, 0.1, "+0.05");

  setTimeout(() => {
    showCoin = false;
  }, 1000); 
  
  return false; 
}
