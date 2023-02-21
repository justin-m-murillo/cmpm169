
class Cell {
    constructor(character, xStr, yStr, tWidth, xBin, yBin) {
        this.char = character;
        this.xBin = xBin;
        this.xStr = xStr;
        this.yBin = yBin;
        this.yStr = yStr;
        this.tWidth = tWidth;

        this.xInc = 10;
        this.yInc = 10;
        
    }

    draw() {
        text(this.char, this.x, this.y, this.tWidth);
    }

    shiftToBin() {

        if (this.xStr < this.xBin) {
            this.x = this.x < this.xBin ?
                this.x + this.xInc :
                this.xBin;
        }

        if (this.xStr > this.xBin) {
            this.x = this.x > this.xBin ?
                this.x - this.xInc :
                this.xBin;
        }

        if (this.yStr < this.yBin) {
            this.y = this.y < this.yBin ?
                this.y + this.yInc :
                this.yBin;
        }

        if (this.yStr > this.yBin) {
            this.y = this.y > this.yBin ? 
                this.y - this.yInc :
                this.yBin;
        }
    }

    shiftToStr() {

        if (this.xBin < this.xStr) {
            this.x = this.x < this.xStr ? 
                this.x + this.xInc :
                this.xStr;
        }

        if (this.xBin > this.xStr) {
            this.x = this.x > this.xStr ?
                this.x - this.xInc :
                this.xStr;
        }

        if (this.yBin < this.yStr) {
            this.y = this.y < this.yStr ?
                this.y + this.yInc :
                this.yStr;
        }

        if (this.yBin > this.yStr) {
            this.y = this.y > this.yStr ?
                this.y - this.yInc :
                this.yStr;
        }
    }
}