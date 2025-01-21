function setup() {
    createCanvas(windowWidth, windowHeight);

    colorMode(HSB);
  }
  
  function draw() {

    let c1 = color(240,100,100,0.5);
    let c2 = color(0,100,100,0.5);
    let c3 = color(120,100,100,0.5);
    
    background(0,0,100);

    fill(c2);
    noStroke();
    circle(900,300,400);

    fill(c3);
    noStroke();
    circle(1050,550,400);

    fill(c1);
    noStroke();
    circle(750,550,400);
  }
  