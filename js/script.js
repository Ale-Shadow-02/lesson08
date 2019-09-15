'use strict';

class carWash {
  constructor (){
    this.brand = '0';
    this.model = '0';
    this.washed = false;
  }

  washReady(){
    console.log('hi');
  }
}

const car = new carWash();
console.log('car: ', car);
