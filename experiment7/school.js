class School {
    constructor(date, name, city, state) {
        this.date = date;
        this.name = name;
        this.city = city;
        this.state = state;
    }

    draw(x, y) {
        text(`${this.date} ${this.name} - ${this.city}, ${this.state}`, x, y);
    }
}