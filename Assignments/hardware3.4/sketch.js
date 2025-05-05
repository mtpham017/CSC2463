//added music for the play and end states and bone crack sound for squishing the alien sprites.
//buzzing when squishing aliens 
//red reticle to target aliens with joystick and joystick click squishes aliens 

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

// Joystick
let port;
let connectionButton, zeroButton;
let cursorX, cursorY;
let joySpeed = 0.01;

// Tone.js sounds
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

  // Serial setup
  port = createSerial();
  connectionButton = createButton('Connect');
  connectionButton.mousePressed(connect);
  zeroButton = createButton('Zero Joystick');
  zeroButton.mousePressed(zero);

  cursorX = width / 2;
  cursorY = height / 2;

  for (let i = 0; i < numAliens; i++) {
    aliens.push(new Alien(random(width), random(height)));
  }
  gameBgMusic.loop = true;
}

function draw() {
  // Read joystick input
  let str = port.readUntil('\n');
  if (str !== "") {
    const values = str.split(',');
    if (values.length == 3) {
      let x = Number(values[0]);
      let y = Number(values[1]);
      let sw = Number(values[2]);

      cursorX += x * joySpeed;
      cursorY += y * joySpeed;
      cursorX = constrain(cursorX, 0, width);
      cursorY = constrain(cursorY, 0, height);

      if (sw === 1) {
        if (gameState === GameStates.START) {
          resetGame();
          startMusicStarted = false;
        } else if (gameState === GameStates.PLAY) {
          for (let alien of aliens) {
            if (!alien.squished && alien.isClicked(cursorX, cursorY)) {
              alien.squish();
              score++;
              squishSound.start();
              port.write('buzz\n');
              break;
            }
          }
        }
      }
    }
  }

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


  //red target reticle design, push pop so it doesnt interfere with game text like score and time 
  if (gameState === GameStates.PLAY) {
    push();
    noFill();
    stroke(255, 0, 0);
    strokeWeight(2);
    line(cursorX - 10, cursorY, cursorX + 10, cursorY);
    line(cursorX, cursorY - 10, cursorX, cursorY + 10);
    circle(cursorX, cursorY, 25);
    pop();
  }
}

function drawStartScreen() {
  textAlign(CENTER, CENTER);
  textSize(17);
  textFont(gameFont);
  fill(0);
  text("Press JOYSTICK to Start", width / 2, height / 2);

  if (!startMusic.loaded) return;
  if (!startMusicStarted) {
    startMusic.start();
    startMusicStarted = true;
  }

  if (gameBgMusic.state === "started") gameBgMusic.stop();
  if (gameOverMusic.state === "started") gameOverMusic.stop();
}

function playGame() {
  textAlign(LEFT, TOP);
  fill(0);
  text("Score: " + score, textPadding, textPadding);
  textAlign(RIGHT, TOP);
  text("Time: " + Math.ceil(time), width - textPadding, textPadding);

  frameCounter++;
  if (frameCounter >= frameDelay) {
    frameIndex = (frameIndex + 1) % 2;
    frameCounter = 0;
  }

  let respawnList = [];

  for (let alien of aliens) {
    alien.update(time);
    alien.display();
    if (alien.shouldRespawn()) {
      respawnList.push(alien);
    }
  }

  for (let alien of respawnList) {
    let index = aliens.indexOf(alien);
    if (index !== -1) {
      aliens.splice(index, 1);
      aliens.push(new Alien(random(width), random(height)));
    }
  }

  time -= deltaTime / 1000;
  if (time <= 0) {
    gameState = GameStates.END;
  }

  if (!gameBgMusic.loaded) return;
  if (gameBgMusic.state !== "started") {
    gameBgMusic.start();
  }

  if (startMusic.state === "started") startMusic.stop();
  if (gameOverMusic.state === "started") gameOverMusic.stop();
}

function drawEndScreen() {
  textAlign(CENTER, CENTER);
  fill(0);
  text("Game Over!", width / 2, height / 2 - 20);
  text("Score: " + score, width / 2, height / 2);
  if (score > highScore) highScore = score;
  text("High Score: " + highScore, width / 2, height / 2 + 20);

  if (!gameOverMusic.loaded) return;
  if (gameOverMusic.state !== "started") {
    gameOverMusic.start();
  }

  if (startMusic.state === "started") startMusic.stop();
  if (gameBgMusic.state === "started") gameBgMusic.stop();
}

function connect() {
  port.open('Arduino', 9600);
}

function zero() {
  if (port.opened()) {
    port.write('zero\n');
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
    this.speed = random(0.5, 1.5);
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
      this.speed += (30 - remainingTime) * 0.0005;
    }

    this.speed += 0.002;
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

  shouldRespawn() {
    return this.squished && millis() - this.squishTime > 2000;
  }
}
