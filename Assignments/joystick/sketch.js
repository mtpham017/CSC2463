let port;
let connectionButton, zeroButton; 
let cursorX, cursorY;
let speed = 0.05;

function setup() {
  createCanvas(400, 400);

  port = createSerial();
  connectionButton = createButton('Connect');
  connectionButton.mousePressed(connect);

  zeroButton = createButton('Zero Joystick');
  zeroButton.mousePressed(zero);

  cursorX = width/2;
  cursorY = height/2;
}

function draw() {
  background(220);

  let str = port.readUntil('\n');
  if (str !== "") {
    const values = str.split(',');
    if (values.length == 3) {
      let x = Number(values[0]);
      let y = Number(values[1]);
      let sw = Number(values[2]);

      cursorX += x * speed;
      cursorY += y * speed;
      //console.log(x + "," + y + "," + sw);

      fill(0);
      circle(cursorX,cursorY,25);
    }
  }
}

function connect() {
  port.open('Arduino', 9600);
}

function zero() {
  if (port.opened()) {
    port.write('zero\n');
  }
}
