

class Turtle {
    constructor(str, len, cir, theta) {
        this.todo = str;
        this.len = len;
        this.cir = cir;
        this.theta = theta;
    

        this.draw = () => {
            stroke(0, 200);
            for (let i = 0; i < this.todo.length; i++) {
                let c = this.todo[i];
                switch(c) {
                    case "F":
                        // move forward and draw
                        line(0, 0, 0, -this.len);
                        translate(0, -this.len);
                        break;
                    case "G":
                        // move forward
                        translate(this.len, 0);
                        break;
                    case "O":
                        push();
                        fill(
                            floor(random(0, 256)),
                            floor(random(0, 256)),
                            floor(random(0, 256))
                        );
                        circle(0, 0, this.cir);
                        pop();
                        break;
                    case "+": 
                        // rotate right
                        rotate(theta);
                        break;
                    case "-": 
                        // rotate left
                        rotate(-theta);
                        break;
                    case "[":
                        // preserve state
                        push();
                        break;
                    case "]":
                        // restore state
                        pop();
                        break;
                    default:
                        break;
                }
            }
        }

        this.setLen = (len) => {
            this.len = len;
        }

        this.changeLen = (percent) => {
            this.len *= percent;
        }

        this.changeCir = (percent) => {
            this.cir *= percent;
        }

        this.setToDo = (str) => {
            this.todo = str;
        }
    }
}