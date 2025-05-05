const GameStates = Object.freeze({
  START: "start",
  PLAY: "play",
  END: "end"
});

let gameState = GameStates.START;

let colors = [];
let selectedColor;
let startX = 10;
let startY = 5;
let squareSize = 50;
let spacing = 5;
let paletteHeight;
let prevX, prevY;
let brushSize = 12;

let bgMusic, endMusic;
let customFont;
let toneStarted = false;

let endButton;
let capturedCanvas;

let port;
let connectButton;
let lastButtonState = 0;

function preload() {
  customFont = loadFont("media/Sketchy.ttf");
  bgMusic = new Tone.Player("media/bgMusic.mp3").toDestination();
  bgMusic.loop = true;
  bgMusic.autostart = false;

  endMusic = new Tone.Player("media/endMusic.mp3").toDestination();
  endMusic.loop = true;
  endMusic.autostart = false;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  textAlign(CENTER, CENTER);
  textSize(32);
  textFont(customFont);

  colors = [
    color(357, 90, 90),
    color(25, 90, 90),
    color(60, 100, 100),
    color(110, 100, 90),
    color(190, 100, 100),
    color(220, 90, 90),
    color(300, 100, 90),
    color(30, 60, 50),
    color(0, 0, 100),
    color(0, 0, 0)
  ];
  selectedColor = colors[0];
  paletteHeight = colors.length * (squareSize + spacing);
  background(0, 0, 100); // White

  endButton = createButton("End Paint Session");
  endButton.position(20, windowHeight - 40);
  endButton.style("background", "none");
  endButton.style("border", "none");
  endButton.style("color", "black");
  endButton.style("font-family", "Sketchy");
  endButton.style("font-size", "20px");
  endButton.mousePressed(() => {
    if (bgMusic.state === "started") bgMusic.stop();
    if (toneStarted && endMusic.state !== "started") endMusic.start();
    capturedCanvas = get(); // save drawing
    gameState = GameStates.END;
    endButton.hide();
  });
  endButton.hide();

  connectButton = createButton("connect");
  connectButton.position(20, 20);
  connectButton.mousePressed(connectSerial);

  port = createSerial();
}

function connectSerial() {
  port.open("Arduino", 9600);
}

function draw() {
  handleSerial(); // handle Arduino input/output

  switch (gameState) {
    case GameStates.START:
      drawStartScreen();
      break;
    case GameStates.PLAY:
      drawPaintingScreen();
      break;
    case GameStates.END:
      drawEndScreen();
      break;
  }
}

function drawStartScreen() {
  background(0, 0, 100);
  fill(0);
  text("Click to Start", width / 2, height / 2);
}

function drawPaintingScreen() {
  drawPalette();

  if (mouseIsPressed && mouseX > startX + squareSize + spacing) {
    stroke(selectedColor);
    strokeWeight(brushSize);
    line(prevX, prevY, mouseX, mouseY);
  }

  prevX = mouseX;
  prevY = mouseY;

  if (bgMusic.state !== "started" && toneStarted) {
    bgMusic.start();
    if (endMusic.state === "started") endMusic.stop();
  }
}

function drawEndScreen() {
  background(0, 0, 100);
  fill(0);
  text("Thanks for Painting!", width / 2, 50);
  if (capturedCanvas) {
    imageMode(CENTER);
    image(capturedCanvas, width / 2, height / 2 + 30, capturedCanvas.width / 2, capturedCanvas.height / 2);
  }

  if (toneStarted && endMusic.state !== "started") {
    endMusic.start();
    if (bgMusic.state === "started") bgMusic.stop();
  }
}

function mousePressed() {
  if (gameState === GameStates.START) {
    Tone.start().then(() => {
      toneStarted = true;
      transitionToPlayState();
    }).catch(err => console.error("Tone failed to start:", err));
    return;
  }

  if (gameState !== GameStates.PLAY) return;

  for (let i = 0; i < colors.length; i++) {
    let y = startY + i * (squareSize + spacing);
    if (mouseX >= startX && mouseX <= startX + squareSize &&
        mouseY >= y && mouseY <= y + squareSize) {
      selectedColor = colors[i];
      return;
    }
  }
}

function transitionToPlayState() {
  background(0, 0, 100);
  gameState = GameStates.PLAY;
  endButton.show();
  bgMusic.start();
}

function drawPalette() {
  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    noStroke();
    let y = startY + i * (squareSize + spacing);
    square(startX, y, squareSize);
  }
}

function handleSerial() {
  let str = port.readUntil('\n');
  if (str !== "") {
    const values = str.trim().split(',');
    if (values.length === 2) {
      const buttonState = parseInt(values[0]);
      const knobValue = parseInt(values[1]);

      if (buttonState === 1 && lastButtonState === 0) {
        let currentIndex = colors.indexOf(selectedColor);
        selectedColor = colors[(currentIndex + 1) % colors.length];
      }
      lastButtonState = buttonState;

      brushSize = map(knobValue, 0, 1023, 5, 50);
    }
  }

  if (port.opened()) {
    let c = selectedColor._array || [0, 0, 0]; 
    let rgb = color(c[0], c[1], c[2]);
    let r = floor(red(rgb));
    let g = floor(green(rgb));
    let b = floor(blue(rgb));
    port.write(`${r},${g},${b}\n`);
  }
}
