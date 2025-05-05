const int buttonPin = 2;
const int redPin = 9;
const int greenPin = 10;
const int bluePin = 11;
const int knobPin = A0;

void setup() {
  Serial.begin(9600);
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
}

void loop() {
  int buttonState = digitalRead(buttonPin) == LOW ? 1 : 0;
  int knobValue = analogRead(knobPin);

  Serial.print(buttonState);
  Serial.print(",");
  Serial.println(knobValue);

  if (Serial.available()) {
    String input = Serial.readStringUntil('\n');
    int r, g, b;
    sscanf(input.c_str(), "%d,%d,%d", &r, &g, &b);
    analogWrite(redPin, r);
    analogWrite(greenPin, g);
    analogWrite(bluePin, b);
  }

  delay(20);
}
