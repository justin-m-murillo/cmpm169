
let x, y;
let rw, rh;
let mainString = "Doing any simple action with delight looks ritualistic. If you watch a very skilled craftsman at work, or a surgeon, or a good dentist, or a shoemaker, or a potter who thoroughly loves the work, you noticed their caressing hands, the delight, the dance they do; to do this thing. The doing of it is more important than the done-ing of it. You see, they look ritualistic in their action. It's a ceremony, and you think he's worshiping some kind of a God. That's because he's turned the rat race into the mandala. So you can do that with everything if you're not in a hurry. And you're not in a hurry if you know there's nowhere to go! I mean, here's the end of the line, and there's a place called death and a tombstone on it that says, \"Well, he did it once.\" We write his name on the tombstone. That's the end. That's where you're going.    - Alan Watts";

let oldMouseX;

let prompt = [];
let binAry = [];

function setup() {
  createCanvas(600, 600);
  oldMouseX = mouseX;

  x = 10;
  y = 10;

  // Setup Bin array parameters
  // 0 - 25 for letters
  // 26 is for special characters
  // 27 is for space
  for (let i = 0; i < 28; i++) {
    let b = new Bin(x, y);
    binAry.push(b);
    y += 20;
  }

  x = 10;
  y = 200;

  // Setup Prompt array parameters
  for (let i = 0; i < mainString.length; i++) {
    let w = textWidth(mainString[i]);
    let ascii = mainString[i].charCodeAt(0) > 64 ?
      mainString[i].toLowerCase().charCodeAt(0) :
      mainString[i].charCodeAt(0);
    let index;
    if (ascii === 32) {
      index = 27;
    }
    else if (ascii - 97 >= 0) {
      index = ascii - 97;
    }
    else {
      index = 26;
    }
    
    // Create cell
    let c = new Cell(
      mainString[i], 
      x, 
      y, 
      w,
      binAry[index].x,
      binAry[index].y
    );

    binAry[index].bin.push(c);
    c.xBin = ((binAry[index].bin.length - 1) * (w*2)) + 20;
    c.x = c.xBin;
    c.y = c.yBin;

    prompt.push(c);
    
    x += textWidth(mainString[i]);
    if (x > width - 20)
    {
      x = 10;
      y += 20;
    }
  }
}

function draw() {
  background(220);

  textAlign(CENTER);

  for (let i = 0; i < prompt.length; i++) {
    if (oldMouseX > mouseX) {
      prompt[i].shiftToBin();
    }
    if (oldMouseX < mouseX) {
      prompt[i].shiftToStr();
    }
    prompt[i].draw();
    
  }

  oldMouseX = mouseX;
}
