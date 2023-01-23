p5.disableFriendlyErrors = true; // disables FES


let inc = 0.1;
let scl = 10;
let cols, rows;

let zoff = 0;

let fr;

let particles = [];

let flowField;

function setup() {
  createCanvas(600, 600);
  fr = createP('');
  
  cols = floor(width / scl);
  rows = floor(height / scl);
  

  flowField = new Array(cols * rows);

  for (let i = 0; i < 1000; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  //background(255);
  randomSeed(10);
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 2; // get a random angle between 0 and 2PI
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowField[index] = v;
      xoff += inc;
      stroke(0, 50);
      push();

      translate(x * scl, y * scl);
      rotate(v.heading());
      strokeWeight(1);
      //line(0, 0, scl, 0);
      
      pop();
    }
    yoff += inc;

    zoff += 0.0003;
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowField);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

  fr.html(floor(frameRate()));
}