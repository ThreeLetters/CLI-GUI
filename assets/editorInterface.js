"use strict";
/*

   Copyright 2016 Andrew S

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

*/
const Box = require('./Box.js')
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
this.noCursor = false;
this.result = [];
this.cstate = true
this.y = 0;
this.interval = setInterval(function() {
if (this.noCursor) return;
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
remove() {
try {
clearInterval(this.interval)
} catch (e) {
}
this.main.removeEditor()
}
createEscBox() {
var width = 34
var height = 5
var st = this.main.coords.toReal(0,5)
var sta = st.x - Math.floor(width/2);
    var b = st.y - Math.floor(height/2);
    var c = "Exit"
  if (this.mode != 3) this.main.prev = this.main.mode
    this.main.mode = 3;
var h = this.main.getNewLayer()  
    var box = new Box(width,height,b,sta,true,h,this.main,null)
var opt = [
{
opt: "[Save]",
onSelect: function(a) {
a.remove()
this.remove()
this.callback(this.data.join("\n"))


}.bind(this),
},
{
opt: "[Dont save]", 
onSelect: function (a) {
  a.remove()
  this.remove()
this.callback(false)
}.bind(this),
},
{
opt: "[Cancel]",
onSelect: function() {
this.noCursor = false;
return "remove"
}.bind(this),

},
]


box.generateOpt(opt)
this.main.boxes[h] = box
    this.main.layers[h][b] = {
      text: this.centerHor(c,width),
      start: sta,
      len: width,
      defaultBG: '\x1b[0m\x1b[47m\x1b[30m'
    }
for (var i = 0; i < 4; i++) {
b++;
 this.main.layers[h][b] = {
      text: this.fill(" ",width),
      start: sta,
      len: width,
      defaultBG: '\x1b[0m\x1b[47m\x1b[30m'
    }
}

this.main.update()
  }
subtractY() {
if (this.cursor.y == 0) return this.y = 0;
if (this.y == 0) {
if (this.startline == 0) return;
this.startline -= this.height - 3
this.y = this.height - 4
return;
}
this.y --;
}
addY() {
if (this.y == this.height - 4) {
this.startline += this.height - 3
this.y = 0;
return;
}

this.y ++;
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
  this.subtractY()
if (!this.data[this.cursor.y] || this.cursor.x >= this.data[this.cursor.y].length) this.cursor.x = (this.data[this.cursor.y]) ? this.data[this.cursor.y].length : 0;
  } else
   if (key == '\u001B\u005B\u0042') { // down
if (this.cursor.y >= this.data.length) return;
   this.cursor.y ++;
   this.addY()
if (!this.data[this.cursor.y] || this.cursor.x >= this.data[this.cursor.y].length) this.cursor.x = (this.data[this.cursor.y]) ? this.data[this.cursor.y].length : 0;
   } else
   if (key == '\u001B\u005B\u0044') { // left
if (this.cursor.x < 1) {
if (this.cursor.y >= 1) {
this.cursor.y --;
this.subtractY()
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
this.addY()
this.cursor.x = 0
this.update()
}
return
}
     this.cursor.x ++;
   } else
if (key == '\u001B') { // esc
this.noCursor = true;
this.createEscBox()

} else

if (key == '\u000D') { // enter
var data = this.data[this.cursor.y]
if (data) {
var after = data.slice(this.cursor.x);
this.data[this.cursor.y] = data.slice(0,this.cursor.x);
this.data.splice(this.cursor.y + 1,0,after)
} else {
this.data.splice(this.cursor.y + 1,0,"")
}
this.cursor.y ++;
this.cursor.x = 0;
this.addY()

} else
if (key == '\u007F') { // back

var data = this.data[this.cursor.y];
if (!data && this.cursor.y != 0) {
this.data.splice(this.cursor.y,1);
this.cursor.y --;
this.subtractY()
this.cursor.x = (this.data[this.cursor.y]) ? this.data[this.cursor.y].length : 0;
} else if (data && this.cursor.x > 0) {
this.data[this.cursor.y] = data.slice(0, this.cursor.x - 1) + data.slice(this.cursor.x);
if (this.cursor.x < 1) {
if (this.cursor.y >= 1) {
this.cursor.y --;
this.subtractY()
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
this.subtractY()
} else {
if (this.cursor.x < 1) {
if (this.cursor.y >= 1) {
this.cursor.y --;
this.subtractY()
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
addCursor(a,b,k) {
if (this.noCursor) return a
var x = (k) ? this.cursor.x - k : this.cursor.x
  // if (a.length >= this.width) a = a.slice(0,this.width)
if (this.cursor.y != b || !this.cstate) return a;
  return a.slice(0, x) + this.main.selectsyle + a.slice(x,x + 1) + "\x1b[0m\x1b[37m\x1b[40m" + a.slice(x + 1);

}
update() {
if (this.cursor.y > this.height) {

}
  var curr = 0;
  this.result[curr] = this.centerHor(this.message + " press Esc to exit",this.width)
  curr += 1;
  for (var i = 0; i < this.height - 3; i++) {
 // console.log(i,curr,this.height)
var data = this.data[this.startline + i]
var k = 0;
if (data && data.length >= this.width - 2) {
if (this.cursor.x > this.width - 8) {
data = data.slice(this.width - 8)
k = this.width - 8
} else {
data = data.slice(0,this.width - 4) + " ->"
}
}
    if (!data) data = "";
    this.result[curr] = {text: this.addCursor(this.fill(data,this.width),this.startline + i,k), textstyle: '\x1b[0m\x1b[37m\x1b[40m'};
    curr ++;
  }
  this.result[this.height - 2] = this.fill("Ln " + (this.cursor.y + 1) +", Col " + (this.cursor.x + 1) + "     " + this.data.length + " lines      Y:" + this.y + "   H:" + this.height,this.width);
this.onupt(this.result)
}
init() { 
  this.data = this.in.split("\n");

this.update()
}


}
