"use strict";

module.exports = class EditorInterface {
constructor(main,out,callback,message,width,height,onupt) {
this.main = main
this.in = out;
this.onupt = onupt
this.callback = callback;
this.width = (width) ? width : this.main.width;
this.height = (height) ? height : this.main.height;
this.message = message;
this.startline = 0;
this.result = [];
this.cstate = true
this.interval = setInterval(function() {
this.cstate = !this.cstate;
this.update()
}.bind(this),700)
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
this.cstate = true;
  if (key == '\u001B\u005B\u0041') { // up
if (this.cursor.y < 1) return;
  this.cursor.y --;
if (!this.data[this.cursor.y] || this.cursor.x >= this.data[this.cursor.y].length) this.cursor.x = (this.data[this.cursor.y]) ? this.data[this.cursor.y].length : 0;
  } else
   if (key == '\u001B\u005B\u0042') { // down
if (this.cursor.y >= this.data.length) return;
   this.cursor.y ++;
if (!this.data[this.cursor.y] || this.cursor.x >= this.data[this.cursor.y].length) this.cursor.x = (this.data[this.cursor.y]) ? this.data[this.cursor.y].length : 0;
   } else
   if (key == '\u001B\u005B\u0044') { // left
if (this.cursor.x < 1) {
if (this.cursor.y >= 1) {
this.cursor.y --;
this.cursor.x = (this.data[this.cursor.y]) ? this.data[this.cursor.y].length : 0;
this.update()
}
return
}
     this.cursor.x --;
   } else
   if (key == '\u001B\u005B\u0043') { // right
if (!this.data[this.cursor.y] || this.cursor.x >= this.data[this.cursor.y].length) {
if (this.cursor.y < this.data.length) {
this.cursor.y ++;
this.cursor.x = 0
this.update()
}
return
}
     this.cursor.x ++;
   } else
if (key == '\u000D') { // enter


} else
if (key == '\u007F') { // back

var data = this.data[this.cursor.y];
if (!data && this.cursor.y != 0) {
this.data.splice(this.cursor.y,1);
this.cursor.y --;
this.cursor.x = (this.data[this.cursor.y]) ? this.data[this.cursor.y].length : 0;
} else if (data && this.cursor.x > 0) {
this.data[this.cursor.y] = data.slice(0, this.cursor.x - 1) + data.slice(this.cursor.x);
if (this.cursor.x < 1) {
if (this.cursor.y >= 1) {
this.cursor.y --;
this.cursor.x = (this.data[this.cursor.y]) ? this.data[this.cursor.y].length : 0;
this.update()
}
return
}
     this.cursor.x --;
} else if (data && this.cursor.x <= 0 && this.cursor.y > 0) {
this.cursor.x = this.data[this.cursor.y - 1].length
this.data[this.cursor.y - 1] += this.data[this.cursor.y];
this.data.splice(this.cursor.y,1)
this.cursor.y --;
} else {
if (this.cursor.x < 1) {
if (this.cursor.y >= 1) {
this.cursor.y --;
this.cursor.x = this.data[this.cursor.y].length
this.data.splice(this.cursor.y + 1,1)
this.update()
}
return
}
     this.cursor.x --;
}

} else {
  if (!this.escapeChar(key)) return;
var data = this.data[this.cursor.y];
if (!data) {
this.data[this.cursor.y] = key
} else {
  this.data[this.cursor.y] = data.slice(0, this.cursor.x) + key + data.slice(this.cursor.x);
}
this.cursor.x ++;
}
this.update()
} 
escapeChar(a) {
 var allowed = "` 1 2 3 4 5 6 7 8 9 0 - = q w e r t y u i o p [ ] | a s d f g h j k l ; ' z x c v b n m , . / ~ ! @ # $ % ^ & * ( ) _ + Q W E R T Y U I O P { } A S D F G H J K L : \\ \" Z X C V B N M < > ?"
 var allow = allowed.split(" ");
 if (a == " ") return true;
 if (allow.indexOf(a) == -1) return false;
 return true;
}
addCursor(a,b) {
  // if (a.length >= this.width) a = a.slice(0,this.width)
if (this.cursor.y != b || !this.cstate) return a;
  return a.slice(0, this.cursor.x) + "\x1b[7m" + a.slice(this.cursor.x,this.cursor.x + 1) + "\x1b[0m\x1b[37m\x1b[40m" + a.slice(this.cursor.x + 1);

}
update() {
  var curr = 0;
  this.result[curr] = this.centerHor(this.message + " press Esc to exit",this.width)
  curr += 2;
  for (var i = 0; i < this.height - 2; i++) {
 // console.log(i,curr,this.height)
var data = this.data[this.startline + i]
    if (!data) data = "";
    this.result[curr] = "\x1b[0m\x1b[37m\x1b[40m" + this.addCursor(this.fill(data,this.width),i);
    curr ++;
  }
  this.result[this.height - 1] = this.fill((this.cursor.y + 1) +" : " + (this.cursor.x + 1) + "     " + this.data.length + " lines",this.width);
this.onupt(this.result)
}
init() { 
  this.data = this.in.split("\n");

this.update()
}


}
