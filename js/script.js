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
  height: ${this.height};
  width: ${this.width};
  font-size: ${this.fontSize};`;
  document.body.append(elem);
};



let domElem = new DomElement('.myClass', '300px', '500px', 'red', '30px');
domElem.createElem('Как же ты не легог JS для новичка! Ёпт');