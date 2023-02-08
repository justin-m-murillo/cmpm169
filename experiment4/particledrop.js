
class ParticleDrop {
    constructor(x, y, r) {
        this.pos = createVector(x, y);
        this.oldPos = this.pos.copy();

        this.vel = p5.Vector.random2D().mult( random(r-1, r+1) );
        this.acc = createVector(0, 0);

        this.justSpawned = true;
        this.alpha = 1;
    }

    update() {
        this.alpha -= this.justSpawned === false ? 0.02 : 0;
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    slowSpawn() {
        if (abs(this.vel.mag()) > 0.1) {
            this.vel.x += -1 * this.vel.x * 0.075;
            this.vel.y += -1 * this.vel.y * 0.075;
        }
        else {
            this.justSpawned = false;
        }
    }

    applyForce(force) {
        let f = p5.Vector.div(force, 15);
        this.acc.add(f);
    }

    edges() {
        if (this.pos.x < (width/2) + 20 &&
            this.pos.x > (width/2) - 20 &&
            this.pos.y < (height/2) + 20 &&
            this.pos.y > (height/2) - 20) {
                return true;
            }
            else {
                return false;
            }
    }

    show(col) {
        strokeWeight(2);
        stroke(col.h, col.s, col.b, this.alpha);
        fill(col.h, col.s, col.b, this.apha);
        line(this.oldPos.x, this.oldPos.y, this.pos.x, this.pos.y);
        this.oldPos = this.pos.copy();
    }
}