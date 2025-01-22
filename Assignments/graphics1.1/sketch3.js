function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
  }
  
  function draw() {
    background(0, 0, 0);
  
    //yellow
    let c1 = color(60, 100, 100);

     //red
     let c2 = color(10,100,100);

     //blue
     let c3 = color(220,100,50);

     //white
     let c4 = color(0,0,100)
  
    //pacman
    fill(c1);
    noStroke();
    arc(550, 400, 600, 600, radians(220), radians(500));

    //ghost
    fill(c2);
    noStroke();
    arc(1300, 400, 600, 600, PI, 0, CHORD);
    rect(1000, 400, 600, 300);

    //eyes
    fill(c4);
    noStroke();
    circle(1170,350,170);
    circle(1450,350,170);

    fill(c3);
    noStroke;
    circle(1170,350,100);
    circle(1450,350,100);
   

    










  }
  
  