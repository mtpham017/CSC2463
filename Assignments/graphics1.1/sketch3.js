function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
  }
  
  function draw() {
    background(0, 0, 0);
  
    
    let c1 = color(60, 100, 100);
  
    
    fill(c1);
    noStroke();
    circle(550, 400, 600);
  
    
    fill(0, 0, 0); 
    noStroke();
    triangle(
      550, 400,                 
      550 - 300, 400 - 150,     
      550 - 300, 400 + 150      
    );
  }
  
  