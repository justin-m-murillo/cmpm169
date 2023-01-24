// Justin Murillo - CMPM 169
// Jan 2023
//
// Based on The Coding Train's Coding Challenge #24: Perlin Noise Flow Field
// https://www.youtube.com/watch?v=BjoM9oKOAKY&list=PLRqwX-V7Uu6bgPNQAdxQZpJuJCjeOr7VD&index=6&ab_channel=TheCodingTrain
//  
// Code was revised to include interactive components that were not discussed in the video above
// along with a few modifications to demonstrate understanding of the project

p5.disableFriendlyErrors = true; // disables FES

let inc = 0.1;
let scl = 10;
let cols, rows;

let zoff = 0;
let zInc;

let fr;

let particles = [];

let flowField;

// random seed
let seed;

// booleans
let showLines = false;
let toClear = false;
let toFreeze = false;

// getters for sliders
let rVal;
let gVal;
let bVal;
let zVal;
let pVal;

// size of the flow field
let xField;
let yField;

function setup() {
  let canvas = createCanvas(610, 710);
  canvas.parent('sketch');

  xField = width-10;
  yField = height-110;

  // gather UI data
  rVal = select('#rSlider');
  gVal = select('#gSlider');
  bVal = select('#bSlider');
  zVal = select('#zSlider');
  pVal = select('#pSlider');
  
  // setup drawing space
  cols = floor((xField) / scl);
  rows = floor((yField) / scl);

  // declare flow field for storing vector data of each cell
  flowField = new Array(cols * rows);

  // generate particles
  generateParticles();
}

function draw() {

  // produce background when showing vector lines
  if (showLines) {
    background(255);
  }
  // add more particles into the system
  if (pVal.value() > particles.length) {
    addParticles(pVal.value());
  }
  // subtract particles from the system
  if (pVal.value() < particles.length) {
    subParticles(pVal.value());
  }

  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 2; // get noise angle
      let v = p5.Vector.fromAngle(angle); // calculate vector
      v.setMag(1); // set vector magnitude
      flowField[index] = v; // assign vector to flow field cell
      xoff += inc; // increment x-offset
      
      push(); // preserve current render changes
      translate(x * scl, y * scl); // position vector lines based on coordinates
      rotate(v.heading()); // rotate lines based on their heading (vector direction)
      if (showLines) { // if showLines is toggled, render vector lines
        stroke(0, 50);
        strokeWeight(1);
        line(0, 0, scl, 0);
      }
      pop(); // return to main draw
    }
    yoff += inc; // increment y-offset

    zInc = zVal.value()/10000; // calculate z-offset increment based on UI
    zoff += (zInc); // increment z-offset
  }

  if (!showLines) { // if showLines is toggled off, paint strokes onto canvas
    for (let i = 0; i < particles.length; i++) {
      particles[i].follow(flowField);
      particles[i].update();
      particles[i].edges();
      particles[i].show(rVal.value(), gVal.value(), bVal.value());
    }
  }

  // UI info
  rectMode(CENTER);
  noStroke();
  rect(width / 2, height-60, width + 100, 50);
  let str = `RGB (${rVal.value()}, ${gVal.value()}, ${bVal.value()})    Noise: ${zInc}    Particles: ${particles.length}`;
  textSize(18);
  text(str, 0, height-50);
}

function generateParticles() {
  for (let i = 0; i < pVal.value(); i++) {
    particles[i] = new Particle(xField, yField);
  }
}

function addParticles() {
  for (let i = particles.length; i < pVal.value(); i++) {
    particles[i] = new Particle(xField, yField);
  }
}

function subParticles() {
  let newCount = particles.length - pVal.value();
  particles.splice(0, newCount);
}

function toggleLines() {
  clear();
  showLines = !showLines;
}

function clearField() {
  let newSeed = floor(random(10000));
  noiseSeed(newSeed); // generate new noise seed
  zoff = 0;
  clear();
}

function freeze() {
  if (!toFreeze) {
    noLoop();
  }
  else {
    loop();
  }

  toFreeze = !toFreeze;
}