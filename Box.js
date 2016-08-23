"use strict"
const SelectionInterface = require('./sinterface.js')
module.exports = class Box {
constructor(width,height,top,start,options,main) {
this.width = width;
this.height = height;
this.options = options;
this.index = false;
this.top = top
this.start = start;
this.main = main
this.option = 0;
if (!this.options) this.genOpt()
  
}
runOpt(opt) {
  if (!this.options[opt] || !this.options[opt].onSelect) return;
  var b = this.options[opt].onSelect()
  if (b == "remove") return this.remove();
}

remove() {
this.main.layers[this.index] = false;
this.main.boxes[this.index] = false;
this.main.sortLayers()
}

genOpt() {
  var a = this.top + this.height
  this.main.layers[this.index][a] = SelectionInterface(this.main.centerHor("[Close]",this.width),0,{start: this.main.width/2 - this.width,
      len: this.width,
      defaultBG: '\x1b[0m\x1b[47m\x1b[30m'})
  this.options[0] = {
    text: this.main.centerHor("[Close]",this.width),
    opt: "[Close]",
    onSelect: function() {
      return "remove"
    }
  }
  
  
}


}
