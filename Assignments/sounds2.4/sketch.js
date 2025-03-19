//added music for the play and end states and bone crack sound for squishing the alien sprites.
//added music for start state but once i tested github pages it stopped working and could not figure out a solution. 

let GameStates = Object.freeze({
  START: "start",
  PLAY: "play",
  END: "end"
});

let gameState = GameStates.START;
let score = 0;
let highScore = 0;
let time = 30;
let textPadding = 15;
let gameFont;
let aliens = [];
let alienSprites, squishSprites;
let numAliens = 5;
let spriteSize = 48;
let frameIndex = 0;
let frameDelay = 10;
let frameCounter = 0;

// Tone.js variables
let startMusic, gameBgMusic, gameOverMusic, squishSound;
let startMusicStarted = false; 

function preload() {
  gameFont = loadFont("media/PressStart2P-Regular.ttf");
  alienSprites = loadImage("sprites.png");
  squishSprites = loadImage("spritesSquished.png");
  startMusic = new Tone.Player("media/startMusic.mp3").toDestination();
  gameBgMusic = new Tone.Player("media/gameBg.mp3").toDestination();
  gameOverMusic = new Tone.Player("media/gameoverMusic.mp3").toDestination();
  squishSound = new Tone.Player("media/squishedSound.mp3").toDestination();
}

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < numAliens; i++) {
    aliens.push(new Alien(random(width), random(height)));
  }
  gameBgMusic.loop = true;
}

function draw() {
  background(220);
  switch (gameState) {
    case GameStates.START:
      drawStartScreen();
      break;
    case GameStates.PLAY:
      playGame();
      break;
    case GameStates.END:
      drawEndScreen();
      break;
  }
}

function drawStartScreen() {
  textAlign(CENTER, CENTER);
  textSize(17);
  textFont(gameFont);
  text("Press ENTER to Start", width / 2, height / 2);
  if (!startMusic.loaded) return;
  // checks if the music has already started
  if (!startMusicStarted) { 
    startMusic.start();
    startMusicStarted = true;
  }

  if(gameBgMusic.state === "started"){
    gameBgMusic.stop();
  }
  if(gameOverMusic.state === "started"){
    gameOverMusic.stop();
  }
}

function playGame() {
  textAlign(LEFT, TOP);
  text("Score: " + score, textPadding, textPadding);
  textAlign(RIGHT, TOP);
  text("Time: " + Math.ceil(time), width - textPadding, textPadding);
  
  frameCounter++;
  if (frameCounter >= frameDelay) {
    frameIndex = (frameIndex + 1) % 2;
    frameCounter = 0;
  }
  
  for (let alien of aliens) {
    alien.update(time); 
    alien.display();
  }
  
  time -= deltaTime / 1000;
  if (time <= 0) {
    gameState = GameStates.END;
  }
  if (!gameBgMusic.loaded) return;
  if (gameBgMusic.state !== "started") {
    gameBgMusic.start();
  }
  if(startMusic.state === "started"){
    startMusic.stop();
  }
  if(gameOverMusic.state === "started"){
    gameOverMusic.stop();
  }
}

function drawEndScreen() {
  textAlign(CENTER, CENTER);
  text("Game Over!", width / 2, height / 2 - 20);
  text("Score: " + score, width / 2, height / 2);
  if (score > highScore) highScore = score;
  text("High Score: " + highScore, width / 2, height / 2 + 20);
  if (!gameOverMusic.loaded) return;
  if (gameOverMusic.state !== "started") {
    gameOverMusic.start();
  }
  if(startMusic.state === "started"){
    startMusic.stop();
  }
  if(gameBgMusic.state === "started"){
    gameBgMusic.stop();
  }
}

function keyPressed() {
  if (gameState === GameStates.START && keyCode === ENTER) {
    resetGame();
    // Reset the flag when starting a new game
    startMusicStarted = false; 
  }
}

function mousePressed() {
  if (gameState === GameStates.PLAY) {
    for (let alien of aliens) {
      if (!alien.squished && alien.isClicked(mouseX, mouseY)) {
        alien.squish();
        score++;
        squishSound.start();

        for (let a of aliens) {
          if (!a.squished) {
            a.speed *= 1.00;
          }
        }
        break;
      }
    }
  }
}

function resetGame() {
  gameState = GameStates.PLAY;
  score = 0;
  time = 30;
  aliens = [];
  for (let i = 0; i < numAliens; i++) {
    aliens.push(new Alien(random(width), random(height)));
  }
}

class Alien {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(1, 3);
    this.angle = random(TWO_PI);
    this.squished = false;
    this.squishTime = 0;
  }

  update(remainingTime) {
    if (!this.squished) {
      this.x += cos(this.angle) * this.speed;
      this.y += sin(this.angle) * this.speed;
      if (this.x < 0 || this.x > width) this.angle = PI - this.angle;
      if (this.y < 0 || this.y > height) this.angle = -this.angle;
      // increase alien speed while time goes down for difficulty 
      this.speed += (30 - remainingTime) * 0.001;
    } else {
      if (millis() - this.squishTime > 2000) {
        let index = aliens.indexOf(this);
        if (index !== -1) aliens.splice(index, 1);
        aliens.push(new Alien(random(width), random(height)));
      }
    }
    this.speed += 0.005;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    imageMode(CENTER);
    if (this.squished) {
      image(squishSprites, 0, 0, spriteSize, spriteSize, frameIndex * spriteSize, 0, spriteSize, spriteSize);
    } else {
      image(alienSprites, 0, 0, spriteSize, spriteSize, frameIndex * spriteSize, 0, spriteSize, spriteSize);
    }
    pop();
  }

  isClicked(mx, my) {
    return dist(mx, my, this.x, this.y) < spriteSize / 2;
  }

  squish() {
    this.squished = true;
    this.speed = 0;
    this.squishTime = millis();
  }
}