// This project is an adaptation to Daniel Shiffman's L-Systems project
// that was originally written in Java for Processing
// https://github.com/nature-of-code/noc-examples-processing/blob/master/chp08_fractals/NOC_8_09_LSystem/LSystem.pde

let lsys;
let turtle;

let main = {
  a: "F",
  b: "FF+[+F-F-F]-[-F+F+F]"
}

let proto = {
  a: "F",
  b: ["FF[+FF][-FF]",
      "FF[+FO][-FF]",
      "FF[+FF][-FO]"
    ]
}

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("#sketch");

  let ruleset = [];
  ruleset.push(new Rule(proto.a, proto.b));
  lsys = new LSystem("F", ruleset);
  turtle = new Turtle(lsys.getSentence(), height/3, height/5, radians(25));

}

function draw() {
  background(200);
  fill(0);

  translate(width/2, height);
  //rotate(-PI/2);
  turtle.draw();
  noLoop();
}

let counter = 0;

function mousePressed() {
  if (counter < 5) {
    push();
    lsys.generate();
    turtle.setToDo(lsys.getSentence());
    turtle.changeLen(0.5);
    turtle.changeCir(0.6);
    pop();
    redraw();
    counter++;
  }
}