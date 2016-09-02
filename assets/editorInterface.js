"use strict";

module.exports = class EditorInterface {
constructor(main,out,callback,message,width,height) {
this.main = main
this.in = out;
this.callback = callback;
this.width = (width) ? width : this.main.width;
this.height = (height) ? height : this.main.height;
this.message = message;
this.init()
this.result = [];
this.cursor = {
  x: 0,
  y: 0
}
this.data = [];
}
fill(a,b,c) {
  return this.main.fill(a,b,c);
}
centerHor(a,b,c) {
  return this.main.centerHor(a,b,c);
}
update() {
  var curr = 0;
  this.result[curr] = this.centerHor(this.message + " press Esc to exit",this.width)
  curr ++;
  for (var i = 0; i < this.height - 2) {
    
  }
}
init() {
  this.data = this.in.split("\n");
this.update()
}


}
