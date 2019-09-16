'use strict';

class Car {
  constructor({
    brand = 'mazda',
    model = 3,
    options = []
  } = {}) {
    this.brand = brand;
    this.model = model;
    this.options = options;
  }

  ride() {
    console.log(this.model + ' ' + this.brand + 'поехала');
  }
}

const car1 = new Car();
const car2 = new Car({
  brand: 'BMW',
  model: '6',
  options: ['ac', 'climat control']
});
console.dir(car1);
console.dir(car2);