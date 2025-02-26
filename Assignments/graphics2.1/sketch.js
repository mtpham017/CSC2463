let samples, sampler, button1, button2, button3, button4, delTimeSlider, feedbackSlider, distSlider, wetSlider;

let rev = new Tone.Reverb(5).toDestination()
let dist = new Tone.Distortion(0).connect(rev);
let del = new Tone.FeedbackDelay(0, 0).toDestination().connect(dist);
del.wet.value = 0.5;


function preload() {
  samples = new Tone.Players({
    eagle: "media/eagle.mp3",
    fire: "media/fire.mp3",
    cash: "media/kaching.mp3",
    nature: "media/nature.mp3"
  }).connect(del)

}

function setup() {
  createCanvas(400, 400);

  
  button1 = createButton("Play Eagle");
  button1.position(100, 40);
  button1.mousePressed(() => {samples.player("eagle").start()});

  button2 = createButton("Play Fire");
  button2.position(250, 40);
  button2.mousePressed(() => {samples.player("fire").start()});

  button3 = createButton("Play Cash");
  button3.position(100, 90);
  button3.mousePressed(() => {samples.player("cash").start()});

  button4 = createButton("Play Nature");
  button4.position(250, 90);
  button4.mousePressed(() => {samples.player("nature").start()});

  // sliders positioning
  delTimeSlider = createSlider(0, 1, 0, 0.01);
  delTimeSlider.position(30, 250);
  delTimeSlider.input(() => {del.delayTime.value = delTimeSlider.value()});

  feedbackSlider = createSlider(0, 0.99, 0, 0.01);
  feedbackSlider.position(210, 250);
  feedbackSlider.input(() => {del.feedback.value = feedbackSlider.value()});

  distSlider = createSlider(0, 10, 0, 0.01);
  distSlider.position(30, 320);
  distSlider.input(() => {dist.distortion = distSlider.value()});

  wetSlider = createSlider(0, 1, 0, 0.01);
  wetSlider.position(210, 320);
  wetSlider.input(() => {rev.wet.value = wetSlider.value()})

  
}

function draw() {
  background(220);

  // text for sliders 
  
  text("Delay Time: " + delTimeSlider.value(), 30, 240);
  text("Feedback: " + feedbackSlider.value(), 210, 240);
  text("Distortion: " + distSlider.value(), 30, 310);
  text("Reverb Wet: " + wetSlider.value(), 210, 310);
}


