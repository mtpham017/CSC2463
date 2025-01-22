function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
  
  }
  
  function draw() {
    //blue bg
    background(230,100,60);
    
    //white
    let c1 = color(0,0,100);

    //green
    let c2 = color(131,88,55);

    //red
    let c3 = color(357, 90, 90);

    //bg circ
    fill(c1);
    noStroke();
    circle(windowWidth/2, windowHeight/2, 600);

    //innerCirc
    fill(c2)
    noStroke();
    circle(windowWidth/2, windowHeight/2, 580);
  
  }
  