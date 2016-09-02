"use strict";

module.exports = class EditorInterface {
constructor(main,out,callback,message,width,height) {
this.main = main
this.in = out;
this.callback = callback;
this.width = (width) ? width : this.main.width;
this.height = (height) ? height : this.main.height;
this.message = message;
this.startline = 0;
this.result = [];
this.cursor = {
  x: 0,
  y: 0
}
this.data = [];
this.init()
}
fill(a,b,c) {
  return this.main.fill(a,b,c);
}
centerHor(a,b,c) {
  return this.main.centerHor(a,b,c);
}
onKey(key) {
  if (key == '\u001B\u005B\u0041') { // up
  this.cursor.y --;
  } else
   if (key == '\u001B\u005B\u0042') { // down
   this.cursor.y ++;
   } else
   if (key == '\u001B\u005B\u0044') { // left
     this.cursor.x --;
   } else
   if (key == '\u001B\u005B\u0043') { // right
     this.cursor.x ++;
   } else
if (key == '\u000D') { // enter
} else
if (key == '\u007F') { // back
} else {
  
}
} 
addCursor(a,b) {
  if (a.length >= this.width) a = a.slice(0,this.width)
if (this.cursor.y != b) return a;
  return a.slice(0, this.cursor.x) + "\x1b[7m" + a.slice(this.cursor.x,this.cursor.x + 1) + "\x1b[0m\x1b[37m\x1b[40m" + a.slice(this.cursor.x + 1);

}
update() {
  var curr = 0;
  this.result[curr] = this.centerHor(this.message + " press Esc to exit",this.width)
  curr += 2;
  for (var i = 0; i < this.height - 2; i++) {
 // console.log(i,curr,this.height)
    if (!this.data[this.startline + i]) this.data[this.startline + i] = "";
    this.result[curr] = "\x1b[0m\x1b[37m\x1b[40m" + this.fill(this.addCursor(this.data[this.startline + i],i),this.width,this.data[this.startline + i].length);
    curr ++;
  }
  this.result[this.height - 1] = this.fill(this.cursor.x + " : " + this.cursor.y,this.width);
}
init() { 
  this.data = this.in.split("\n");
this.update()
}


}
