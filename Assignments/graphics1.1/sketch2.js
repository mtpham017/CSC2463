function setup() {
    createCanvas(windowWidth, windowHeight);

    colorMode(HSB, 360, 100, 100, 255);
  }
  
  function draw() {

    //blue
    let c1 = color(240,80,100);
    
    //red
    let c2 = color(0,80,100);
    
    //green
    let c3 = color(120,80,100);

    c1.setAlpha(128); 
    c2.setAlpha(128); 
    c3.setAlpha(128); 
    
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
  