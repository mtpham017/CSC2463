let port;
let connectButton;

function setup() {
  createCanvas(400, 400);

  connectButton = createButton('Connect');
  connectButton.mousePressed(connect);

  noStroke();

  port = createSerial();
}

function draw() {
  fill(225, 0, 0);
  rect(0, 0, width/2, height/2);

  fill(0,255,0);
  rect(width/2, 0, width/2, height/2);

  fill(0, 0, 255);
  rect(0, height/2, width/2, height/2);

  fill(255, 255, 0);
  rect(width/2, height/2, width/2, height/2,);

  let str = port.readUntil('\n');
  if (str !== "" ) {
    const values = str.split(',');

    if (values.length === 3) {
      fill(values[0], values[1], values[2]);
      circle(25,25,25);
    }
  }

  let c = get(mouseX, mouseY);
  if (port.opened()) {
    let msg = c[0] + "," + c[1] + "," + c[2] + "\n";
    port.write(msg);
  }
}

function connect() {
  port.open('Arduino', 9600);
} 
