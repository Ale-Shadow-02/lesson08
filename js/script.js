'use strict';

function DomElement(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}

DomElement.prototype.ride = function () {
  if (this.selector === '.') {
    let a = document.createElement('div');
     document.querySelector('body').appendChild(a);
  } else {
    console.log('false');
  }
  };

let domElem = new DomElement('.', '100', 200);
console.log(domElem);

/* 	window.onload = function () {
	  let d = document.createElement('div');
	  d.style.width = '200px';
	  d.style.height = '100px';
	  d.style.background = 'red';
	  document.body.appendChild(d);
	};
 */