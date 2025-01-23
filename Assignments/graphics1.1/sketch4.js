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

    fill(c1);
    noStroke();
    star(windowWidth / 2, windowHeight / 2, 120, 310, 5, -PI / 2); 

    fill(c3);
    noStroke();
    star(windowWidth / 2, windowHeight / 2, 110, 290, 5, -PI / 2);
  }
  
  function star(x, y, radius1, radius2, npoints, rotation = 0) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a + rotation) * radius2;
      let sy = y + sin(a + rotation) * radius2;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle + rotation) * radius1;
      sy = y + sin(a + halfAngle + rotation) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }