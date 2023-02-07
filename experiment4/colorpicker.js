// COLORS
// HSB FORMAT
const GAINS = {
    h: 240,
    s: 1,
    b: 89
};
const PURPLE = {
    h: 326, 
    s: 100, 
    b: 80
};
const BLUE = {
    h: 186, 
    s: 83, 
    b: 54
};
const RED = {
    h: 2, 
    s: 76, 
    b: 86
};
const YELLOW = {
    h: 40,
    s: 66,
    b: 100
};
const THISTLE = {
    h: 316,
    s: 9,
    b: 81
};
const CYAN = {
    h: 190,
    s: 19,
    b: 97
};
const TARTORG = {
    h: 2,
    s: 74,
    b: 96
};
const TGREEN = {
    h: 140,
    s: 23,
    b: 89
};
const ROSE = {
    h: 332,
    s: 99,
    b: 85
};
const IRED = {
    h: 357,
    s: 60,
    b: 84
};
const RCORSA = {
    h: 357,
    s: 100,
    b: 84
};
const AZURE = {
    h: 220,
    s: 70,
    b: 96
};
const CGREEN = {
    h: 161,
    s: 90,
    b: 79
};
const SAFFRON = {
    h: 30,
    s: 74,
    b: 98
};
const BYZ = {
    h: 315,
    s: 98,
    b: 51
};
const SCREAMGREEN = {
    h: 135,
    s: 79,
    b: 100
};
const CELADON = {
    h: 138,
    s: 26,
    b: 90
};
const BBELL = {
    h: 256,
    s: 27,
    b: 83
};
const PISTACHIO = {
    h: 118,
    s: 33,
    b: 80
};
const PLUM = {
    h: 307,
    s: 60,
    b: 56
};
const PBLUE = {
    h: 229,
    s: 97,
    b: 78
};
const CANDYRED = {
    h: 3,
    s: 100,
    b: 100
};
const BITTERSWEET = {
    h: 8,
    s: 64,
    b: 100
};
const EMERALD = {
    h: 150,
    s: 100,
    b: 80
};

const COLORS = [
    PURPLE,
    BLUE,
    RED,
    YELLOW,
    THISTLE,
    CYAN,
    TARTORG,
    TGREEN,
    ROSE,
    IRED,
    RCORSA,
    AZURE,
    CGREEN,
    SAFFRON,
    BYZ,
    SCREAMGREEN,
    CELADON,
    BBELL,
    PISTACHIO,
    PLUM,
    PBLUE,
    CANDYRED,
    BITTERSWEET,
    EMERALD
];

class ColorPicker {

    static getRandomColor(startColor) {
        let select;
        do {
            select = COLORS[ floor( random(0, COLORS.length) ) ];
        }
        while (select === startColor);
        return select;
    }

    static getDefaultColor() {
        return GAINS;
    }
}