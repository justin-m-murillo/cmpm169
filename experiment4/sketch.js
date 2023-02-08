
let song, w;
let audioLoaded = false;
let isPlaying = false;
let isEnergy = false;
let input;

const BANDS = 128;
let fft, ampl;
const LOHZ = 20;
const HIHZ = 200;
const VOL_THRESHOLD = 230;
let bar = 0;

let particles = [];
let particlesDrop = [];

let coreColor;
let auraColor;
let energyColor;
let energyTrigger = false;

// Text Object Parameters
let textObj = {
  text1: "DRAG AND DROP A SONG ON THE PAGE",
  text2: "OR PRESS SPACE TO START PLAYING",
  size: 18,
  x2: 50,
  y2: 100,
  alpha: 1
};

// Inner Shape Parameters
let is_number = 12;
let is_radius = 50;
let is_distance;
let is_shape;
const N_SHAPES = 4;

// Outer Ellipses Parameters
let oe_inc = 4;
let oe_width = 24;
let oe_height = 0;
let oe_maxHeightRadius = 24;
let oe_dist = 0;
let oe_maxDistance = 320;

function preload() {
  song = loadSound('audio/bare-your-soul.mp3', () => {
    audioLoaded = true;
    song.pause();
    song.onended(() => {
      isPlaying = false;
    })
  });
}

function loaded() {
  console.log('song loaded');
  audioLoaded = true;
  song.play();
  isPlaying = true;
  song.onended(() => {
    isPlaying = false;
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("#canvas");
  canvas.drop(readFile);
  colorMode(HSB);
  angleMode(RADIANS);
  textAlign(CENTER, CENTER);

  ampl = new p5.Amplitude();
  ampl.smooth(0.9);
  fft = new p5.FFT(0.9);

}

function draw() {
  background(0);

  if (!isPlaying) {
    displayText(1);

    energyColor = ColorPicker.getDefaultColor();
    auraColor = energyColor;
    coreColor = energyColor;
  }
  else {
    displayText(0);
  }
  
  let level = ampl.getLevel();
  let spectrum = fft.analyze();
  let energy = fft.getEnergy(LOHZ, HIHZ);
  if (!isEnergy && energy > VOL_THRESHOLD && !energyTrigger) {
    energyColor = ColorPicker.getRandomColor(energyColor);
    auraColor = ColorPicker.getRandomColor(energyColor);
    coreColor = ColorPicker.getRandomColor(auraColor);
    let n;
    do {
      n = floor( random(0, N_SHAPES) );
    }
    while (n === is_shape);
    is_shape = n;
    isEnergy = true;
    energyTrigger = true;
  }
  if (isEnergy && energy <= VOL_THRESHOLD) {
    isEnergy = false;
    energyTrigger = false;
    //bar = 0;
  }

  // START SPEAKER
  resetMatrix();
  setCenter(width/2, height/2);

  //// PARTICLES
  if (isPlaying) {
    let p = new Particle(100);
    particles.push(p);
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    if (!particles[i].edges()) {
      particles[i].update(isEnergy);
      particles[i].show(energyColor);
    } else {
      particles.splice(i, 1);
    }
  }

  //// TRIANGLES
  push();
  noFill();
  stroke(energyColor.h, energyColor.s, energyColor.b);
  drawTriangles(oe_dist + 80);
  pop();

  //// OUTER ELLIPSES
  push();
  noFill();
  stroke(energyColor.h, energyColor.s, energyColor.b);
  drawOuterEllipses();
  pop();

  //// INNER OCTOGONS
  push();
  noFill();
  strokeWeight(2);
  stroke(coreColor.h, coreColor.s, coreColor.b);
  drawOctogons(-25, level);
  pop();

  push();
  noFill();
  strokeWeight(2);
  stroke(coreColor.h, coreColor.s, coreColor.b);
  drawOctogons(-20, level);
  pop();

  //// INNER PENTAGONS 1
  push();
  drawInnerShapes(-5, level, is_shape);
  pop();

  //// INNER PENTAGONS 2
  push();
  drawInnerShapes(0, level, is_shape);
  pop();

  //// INNER PENTAGONS 3
  push();
  drawInnerShapes(5, level, is_shape);
  pop();

  //// INNER ELLIPSES
  push();
  drawInnerEllipses(spectrum);
  rotate(PI/2);
  drawInnerEllipses(spectrum);
  pop();

  // END SPEAKER
  //////////////////////

  resetMatrix();
  setCenter(0, 0);
  push();
  for (let i = particlesDrop.length - 1; i >= 0; i--) {
    if (particlesDrop[i].justSpawned) {
      particlesDrop[i].slowSpawn();
    }
    if (!particlesDrop[i].justSpawned) {
      let vx = ((width/2) - particlesDrop[i].pos.x) * 0.05;
      let vy = ((height/2) - particlesDrop[i].pos.y) * 0.05;
      let v = createVector(vx, vy);
      particlesDrop[i].applyForce(v);
    }
    if (particlesDrop[i].edges()) {
      particlesDrop.splice(i, 1);
      continue;
    }
    particlesDrop[i].update(isEnergy);
    particlesDrop[i].show(energyColor);   
  }
  pop();

}

function keyPressed() {
  if (keyCode === 32) {
    handlePause();  
  }
}

function displayText(alpha) {
  textObj.alpha += textObj.alpha < alpha ? 0.01 : -0.01;
  fill(255, textObj.alpha);
  stroke(255, textObj.alpha);
  textSize(textObj.size);
  let x = width/2;
  let y = height * (3/4)
  text(textObj.text1, x, y);
  text(textObj.text2, x, y + 30);
}

function handlePause() {
  if (!isPlaying && audioLoaded) {
    song.play();
    isPlaying = true;
  }
  else {
    song.pause();
    isPlaying = false;
  }
}

function spawnParticlesDrop() {
  for (let i = 0; i < 25; i++) {
    let p = new ParticleDrop(mouseX, mouseY, 2);
    particlesDrop.push(p);
  }
}

function readFile(file) {
  if (isPlaying) {
    window.alert("Cannot upload while playing. Press Space to pause.");
    return;
  }
  if (file.type === 'audio') {
    spawnParticlesDrop();
    song = loadSound(file.data, loaded);
  } 
  else {
    window.alert("Invalid file type");
  }
}

function drawOuterEllipses() {
  rotate(frameCount * 0.001);
  if (isPlaying) {
    oe_height += oe_height < oe_maxHeightRadius ? oe_inc : 0;
    oe_dist += oe_dist < oe_maxDistance ? oe_inc : 0;
  }
  else {
    oe_height -= oe_height > 0 ? oe_inc : 0;
    oe_dist -= oe_dist > 0 ? oe_inc : 0;
  }
  polarEllipses(64, oe_width, oe_height, oe_dist);
}

function drawInnerEllipses(spectrum) {
  let rescale = spectrum.length/4;
  for (let i = 0; i < rescale; i += 4) {
    let angle = map(i, 0, rescale, 0, 360);
    let amp = spectrum[i];
    let r = map(amp, 0, 256, 0, 360);
    let x = r * cos(angle);
    let y = r * sin(angle);
    noFill();
    let col = map(i, 0, rescale, 0, 255);
    stroke(col, 255, 255, 0.3);
    polarEllipse(angle, 40 + sin(r), amp, 10);
  }
}

function drawInnerShapes(offset, level, shape) {
  let distance = map(level, 0, 1, 0, height/2);
  noFill();
  stroke(auraColor.h, auraColor.s, auraColor.b);
  switch (shape) {
    case 0:
      polarPentagons(is_number, is_radius, distance + offset);
      break;
    case 1:
      polarHexagons(is_number, is_radius, distance + offset);
      break;
    case 2:
      polarHeptagons(is_number, is_radius, distance + offset);
      break;
    case 3:
      polarOctagons(is_number, is_radius, distance + offset);
      break;
    default:
      polarPolygons(is_number, 10, is_radius, distance + offset);
      break;
  }
}

function drawOctogons(offset, level) {
  let distance = map(level, 0, 1, 0, height/3);
  //fill(2, 76, 86, 0.1);
  
  distance = distance + offset > 0 ? distance + offset : 0;
  polarOctagons(24, 50, distance);
}

function drawTriangles(dist) {
  rotate(frameCount * -0.001);
  //stroke(PURPLE.h, PURPLE.s, PURPLE.b);
  polarTriangles(24, 24, dist);
}
