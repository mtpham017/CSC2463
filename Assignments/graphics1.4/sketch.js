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
//number of aliens on screen
let numAliens = 5;
//Dimensions of the spirtes in px
let spriteSize = 48;
let frameIndex = 0;
let frameDelay = 10;
let frameCounter = 0;

function preload() {
  gameFont = loadFont("media/PressStart2P-Regular.ttf");
  alienSprites = loadImage("sprites.png");
  squishSprites = loadImage("spritesSquished.png");
}

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < numAliens; i++) {
    aliens.push(new Alien(random(width), random(height)));
  }
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
    alien.update();
    alien.display();
  }
  
  time -= deltaTime / 1000;
  if (time <= 0) {
    gameState = GameStates.END;
  }
}

function drawEndScreen() {
  textAlign(CENTER, CENTER);
  text("Game Over!", width / 2, height / 2 - 20);
  text("Score: " + score, width / 2, height / 2);
  if (score > highScore) highScore = score;
  text("High Score: " + highScore, width / 2, height / 2 + 20);
}

function keyPressed() {
  if (gameState === GameStates.START && keyCode === ENTER) {
    resetGame();
  }
}

function mousePressed() {

  if (gameState === GameStates.PLAY) {
    for (let alien of aliens) {
      if (!alien.squished && alien.isClicked(mouseX, mouseY)) {
        alien.squish();
        score++;

        //increases diff after aliens are squished by increasing speed
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

  update() {
    if (!this.squished) {
      this.x += cos(this.angle) * this.speed;
      this.y += sin(this.angle) * this.speed;
      if (this.x < 0 || this.x > width) this.angle = PI - this.angle;
      if (this.y < 0 || this.y > height) this.angle = -this.angle;
    } else {

      //remove squished alien after a few seconds 
      if (millis() - this.squishTime > 2000) {
        let index = aliens.indexOf(this);
        if (index !== -1) aliens.splice(index, 1);
        aliens.push(new Alien(random(width), random(height))); //spawns new alien
      }
    }
    this.speed += 0.005; 
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    imageMode(CENTER);
    //replaces sprite with squished vairent
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

