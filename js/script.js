'use strict';

function DomElement(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;

}

DomElement.prototype.createElem = function (text) {
  let type;
  if (this.selector.startsWith('.')) {
    type = 'div';
  } else if (this.selector.startsWith('#')) {
    type = 'p';
  }
  let elem = document.createElement(type);
  elem.innerText = text;
  elem.style.cssText =
  `background-color: ${this.bg};
  selector: ${this.selector};
  height: ${this.height + 'px'} ;
  width: ${this.width + 'px'} ;
  font-size: ${this.fontSize + 'px'} ;`;
  document.body.append(elem);
};



let domElem = new DomElement('.myClass', '300', '500', 'red', '30');
domElem.createElem('Как же ты не легог JS для новичка! Ёпт');
