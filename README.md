# Arduino-Powered Paint App

## Project Description 

This is a painting app made with **p5.js** and an **Arduino** that acts like a **macro pad** for enhanced painting controls. The Arduino lets users quickly cycle through brush colors using a button and adjust brush size with a knob, providing a hands-on interface for digital art.

---

## What it is

- A simple, interactive **paint application**
- Uses **p5.js** for visuals and **Tone.js** for background music
- Integrates an **Arduino** to:
  - Change brush color using a physical **button**
  - Adjust brush size using a **potentiometer (knob)**
  - Display the selected brush color on a connected **RGB LED**

---

## Demo Video

[![Watch the video](https://img.youtube.com/vi/uaxrrJZGc2w/0.jpg)](https://www.youtube.com/watch?v=uaxrrJZGc2w)


---

## Interface Screens

### Start Screen
> A clean title screen inviting the user to begin by clicking.

![image](https://github.com/user-attachments/assets/6037fa5f-e490-43dd-a815-da9ee6b316a0)

_This is the opening screen before painting begins._

---

### Painting Canvas
> Users can draw with color and brush size controlled via the Arduino.

![image](https://github.com/user-attachments/assets/5fe2b4f8-3207-49dc-ad06-88eb16bba2b8)

_The live canvas area where the user paints._

---

### End Screen
> A final screen showing the completed drawing and playing end music.

![image](https://github.com/user-attachments/assets/08b784a4-73bd-4f74-b6ad-37b81b8dbc8f)

_This appears after the “End Paint Session” button is clicked._

---

## Arduino Wiring Diagram

![image](https://github.com/user-attachments/assets/19e6a33e-f465-4298-ba79-81355943001f)


_This diagram shows how the button, RGB LED, and potentiometer are connected to the Arduino. The button cycles brush colors, the potentiometer adjusts brush size, and the LED displays the current color._

---

## Future Development

There are two directions I've thought of if decided to develop this further: 

### 1. Game-Focused Path
- Turn it into a **coloring challenge game**
- Let users select a **coloring sheet** (preloaded outline)
- If they **color outside the lines**, an **Arduino buzzer** sounds
- Add timers or accuracy scoring for a fun, creative challenge

### 2. Arduino Control Expansion
- Lean into the Arduino-as-a-macro-pad idea
- Add **more buttons** to switch between tools like:
  - Paint brush
  - Pencil
  - Bucket fill
  - Eraser
- Include a toggle to change **backgrounds** or **brush textures**

---



