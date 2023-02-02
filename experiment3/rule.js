
// class Rule {
//     constructor(char, r) {
//         this.sym = char;
//         this.intr = r;

//         // get symbol from string
//         this.getSym = () => { return this.sym; }
//         // get whole string
//         this.getIntr = () => { return this.intr; }
//     }
// }

class Rule {
    constructor(char, r) {
        this.sym = char;
        this.intr = r;

        this.getSym = () => { return this.sym; }
        this.getIntr = () => {
            let n = floor(random(0, this.intr.length));
            return this.intr[n]; 
        }
    }
}