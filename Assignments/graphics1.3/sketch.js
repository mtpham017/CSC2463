let miner;
let eskimo;
let robot;
let character1; // First character
let character2; // Second character
let character3; // Third character

function preload() {
  miner = loadImage("SpelunkyGuy.png");
  eskimo = loadImage("Eskimo.png");
  robot = loadImage("Robot.png");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);

  
  character1 = new Character(random(80, width - 80), random(80, height - 80));
  character1.addAnimation("down", new SpriteAnimation(miner, 6, 5, 6));
  character1.addAnimation("up", new SpriteAnimation(miner, 0, 5, 6));
  character1.addAnimation("stand", new SpriteAnimation(miner, 0, 0, 1));
  character1.addAnimation("right", new SpriteAnimation(miner, 1, 0, 6));
  character1.addAnimation("left", new SpriteAnimation(miner, 1, 0, 6));
  character1.currentAnimation = "stand";

  
  character2 = new Character(random(80, width - 80), random(80, height - 80));
  character2.addAnimation("down", new SpriteAnimation(eskimo, 6, 5, 6));
  character2.addAnimation("up", new SpriteAnimation(eskimo, 0, 5, 6));
  character2.addAnimation("stand", new SpriteAnimation(eskimo, 0, 0, 1));
  character2.addAnimation("right", new SpriteAnimation(eskimo, 1, 0, 6));
  character2.addAnimation("left", new SpriteAnimation(eskimo, 1, 0, 6));
  character2.currentAnimation = "stand";

  
  character3 = new Character(random(80, width - 80), random(80, height - 80));
  character3.addAnimation("down", new SpriteAnimation(robot, 6, 5, 6));
  character3.addAnimation("up", new SpriteAnimation(robot, 0, 5, 6));
  character3.addAnimation("stand", new SpriteAnimation(robot, 0, 0, 1));
  character3.addAnimation("right", new SpriteAnimation(robot, 1, 0, 6));
  character3.addAnimation("left", new SpriteAnimation(robot, 1, 0, 6));
  character3.currentAnimation = "stand";
}

function draw() {
  background(220);

  
  character1.draw();
  character2.draw();
  character3.draw();
}

function keyPressed() {

  // chracter 1 controls 
  character1.keyPressed();

  // character 2 controls 
  if (key === 'w') {
    character2.currentAnimation = "up";
  } else if (key === 's') {
    character2.currentAnimation = "down";
  } else if (key === 'd') {
    character2.currentAnimation = "right";
    character2.animation["right"].flipped = false;
  } else if (key === 'a') {
    character2.currentAnimation = "left";
    character2.animation["left"].flipped = true;
  }

  // character 3 controls 
  if (key === 'i') {
    character3.currentAnimation = "up";
  } else if (key === 'k') {
    character3.currentAnimation = "down";
  } else if (key === 'l') {
    character3.currentAnimation = "right";
    character3.animation["right"].flipped = false;
  } else if (key === 'j') {
    character3.currentAnimation = "left";
    character3.animation["left"].flipped = true;
  }
}

function keyReleased() {

  // reset character animations
  character1.keyReleased();
  character2.keyReleased();
  character3.keyReleased();

}

class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.currentAnimation = null;
    this.animation = {};
  }

  addAnimation(key, animation) {
    this.animation[key] = animation;
  }

  draw() {
    let animation = this.animation[this.currentAnimation];
    if (animation) {
      // characters stay within canvas
      switch (this.currentAnimation) {
        case "up":
          this.y = max(40, this.y - 2); 
          break;
        case "down":
          this.y = min(height - 40, this.y + 2); 
          break;
        case "right":
          this.x = min(width - 40, this.x + 2); 
          break;
        case "left":
          this.x = max(40, this.x - 2); 
          break;
      }
      push();
      translate(this.x, this.y);
      animation.draw();
      pop();
    }
  }

  keyPressed() {
    switch (keyCode) {
      case UP_ARROW:
        this.currentAnimation = "up";
        break;
      case DOWN_ARROW:
        this.currentAnimation = "down";
        break;
      case RIGHT_ARROW:
        this.currentAnimation = "right";
        this.animation["right"].flipped = false; // Ensure not flipped
        break;
      case LEFT_ARROW:
        this.currentAnimation = "left";
        this.animation["left"].flipped = true; // Flip for left movement
        break;
    }
  }

  keyReleased() {
    this.currentAnimation = "stand";
  }
}

class SpriteAnimation {
  constructor(spritesheet, startU, startV, duration) {
    this.spritesheet = spritesheet;
    this.u = startU;
    this.v = startV;
    this.duration = duration;
    this.startU = startU;
    this.frameCount = 0;
    this.flipped = false;
  }

  draw() {
    let s = this.flipped ? -1 : 1; 
    scale(s, 1);
    image(this.spritesheet, 0, 0, 80, 80, this.u * 80, this.v * 80, 80, 80);

    this.frameCount++;
    if (this.frameCount % 10 === 0) this.u++;

    if (this.u === this.startU + this.duration) this.u = this.startU;
  }
}