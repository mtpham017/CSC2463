// define right and left animation 
// move along horizontal
// add more characters


let miner;
let character;

function preload(){
  miner = loadImage("SpelunkyGuy.png")
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);

  character = new Character(random(80, width-80), random(80, height-80));
  character.addAnimation ("down", new SpriteAnimation(miner, 6, 5, 6))
  character.addAnimation("up", new SpriteAnimation(miner, 0, 5, 6))
  character.addAnimation("stand", new SpriteAnimation(miner, 0, 0, 1))
  character.currentAnimation = "stand";

}

function draw() {
  background(220); 

  character.draw();
}

function keyPressed() {
  character.keyPressed();
}

function keyReleased() {
  character.keyReleased();

}


class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.currentAnimation = null;
    this.animation = {}
  }

  addAnimation(key, animation) {
    this.animation[key] = animation;

  }

  draw() {
    let animation = this.animation[this.currentAnimation];
    if (animation) {
      switch(this.currentAnimation) {
        case "up":
          this.y -= 2;
          break;
        case "down":
          this.y += 2;
          break;
      }
      push();
      translate(this.x, this.y);
      animation.draw();
      pop();
    }
  }

   keyPressed() {
    switch(keyCode) {
      case UP_ARROW:
        this.currentAnimation = "up";
        break;
      case DOWN_ARROW:
        this.currentAnimation = "down";
        break;
      
    }
  }
  
   keyReleased() {
    this.currentAnimation = "stand";
    // this.animation[this.currentAnimation].flipped = true;
  
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

    let s = (this.flipped) ? -1 : 1;
    scale(s,1);
    image(this.spritesheet, 0, 0, 80, 80, this.u*80, this.v*80, 80, 80);

    this.frameCount++;
    if (this.frameCount % 10 === 0)
      this.u++;

    if (this.u === this.startU + this.duration)
      this.u = this.startU;
  }
}