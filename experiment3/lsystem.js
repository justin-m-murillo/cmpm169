

class LSystem {
    constructor(axiom, r) {
        this.sentence = axiom;
        this.ruleset = r;
        this.generation = 0;
    
        this.generate = () => {
            let nextgen = "";

            for (let i = 0; i < this.sentence.length; i++) {
                let curr = this.sentence[i];
                let replace = curr;

                for (let j = 0; j < this.ruleset.length; j++) {
                    let s = this.ruleset[j].getSym();

                    if (s == curr) {
                        replace = this.ruleset[j].getIntr();
                        break;
                    }
                }

                nextgen += replace;
            }

            this.sentence = nextgen;
            this.generation++;
        }

        this.getSentence = () => { return this.sentence; }

        this.getGeneration = () => { return this.generation; }
    }
}