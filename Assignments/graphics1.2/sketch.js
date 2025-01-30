function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
}

function draw() {
  // White background
  background(0, 0, 100);

  // Define colors
  let c1 = color(357, 90, 90);  // Red
  let c2 = color(25, 90, 90);   // Orange
  let c3 = color(60, 100, 100);   // Yellow
  let c4 = color(110, 100, 90); // Neon Green
  let c5 = color(190, 100, 100); // Light Blue
  let c6 = color(220, 90, 90);  // Blue
  let c7 = color(300, 100, 90); // Neon Purple
  let c8 = color(30, 60, 50);   // Brown
  let c9 = color(0, 0, 100);    // White
  let c10 = color(0, 0, 0);     // Black

  let colors = [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10];
  let startX = 10;
  let startY = 5;
  let squareSize = 50;
  let spacing = 5; // Space between squares

  // Draw squares with respective colors
  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    noStroke();
    square(startX, startY + i * (squareSize + spacing), squareSize);
  }
}
