//setup for palette
let colors = [];
let selectedColor;
let startX = 10;
let startY = 5;
let squareSize = 50;
let spacing = 5;
let paletteHeight;
let prevX, prevY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  
  //color palette as an array
  colors = [
    color(357, 90, 90),  // Red
    color(25, 90, 90),   // Orange
    color(60, 100, 100), // Yellow
    color(110, 100, 90), // Neon Green
    color(190, 100, 100),// Light Blue
    color(220, 90, 90),  // Blue
    color(300, 100, 90), // Neon Purple
    color(30, 60, 50),   // Brown
    color(0, 0, 100),    // White
    color(0, 0, 0)       // Black
  ];

  selectedColor = colors[0]; // Default to first color
  paletteHeight = colors.length * (squareSize + spacing);
  background(0, 0, 100); // White background
  drawPalette(); // Draw the palette once at the start
}

function draw() {
  if (mouseIsPressed) {
    if (mouseX > startX + squareSize + spacing) {
      stroke(selectedColor);
      strokeWeight(10);
      line(prevX, prevY, mouseX, mouseY);
    }
  }
  prevX = mouseX;
  prevY = mouseY;
  
  drawPalette(); // Keep the palette visible
}

function mousePressed() {
  // checks if a color is selected
  for (let i = 0; i < colors.length; i++) {
    let y = startY + i * (squareSize + spacing);
    if (mouseX >= startX && mouseX <= startX + squareSize &&
        mouseY >= y && mouseY <= y + squareSize) {
      selectedColor = colors[i];
      return;
    }
  }
}

//color palette 
function drawPalette() {
  for (let i = 0; i < colors.length; i++) {
    //sets the color of the squares from the colors array 
    fill(colors[i]);
    noStroke();
    let y = startY + i * (squareSize + spacing);
    square(startX, y, squareSize);
  }
}
