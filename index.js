"use strict"
const EOL = require('os').EOL;
const Box = require('./Box.js')
module.exports = class cligui {
  
  constructor() {
this.width = process.stdout.columns    
   this.height = process.stdout.rows
this.current = [];
this.option = 0;
this.options = [];
this.callbacks = false;
this.index = 0;
this.prev = false;
this.boxes = [];
this.mode = false;
this.layers = [];
this.sudolayer = [];
this.textstyle = "\x1b[30m"
this.backround = "\u001B[44m"
this.typed = "";
this.stdin = process.stdin;
this.stdin.setRawMode(true);
this.stdin.resume();
this.stdin.setEncoding('utf8');
process.stdout.on('resize', function() { 
  this.width = process.stdout.columns    
   this.height = process.stdout.rows
  this.update()
}.bind(this))
this.stdin.on('data', function(key){
   this.dataRecieved(key)


    if (key == '\u0003') { process.exit(); }    // ctrl-c
}.bind(this));
  }
  fill(a,b) {
a = a.toString()
var c = b - a.length
for (var i = 0; i < c; i++) {
a += " ";

}
return a

}


dataRecieved(key) {
switch (this.mode) {
case 0:
 if (key == '\u001B\u005B\u0041') {
        if (this.option > 0) { this.option --;
if (this.options[this.option].onSelection) this.options[this.option].onSelection(this)
this.update()    
}
   }
    if (key == '\u001B\u005B\u0042') {

        if (this.option < this.options.length - 1) { this.option ++; 
if (this.options[this.option].onSelection) this.options[this.option].onSelection(this)
this.update()    
}
}
if (key == '\u000D') {

if (typeof this.callbacks == "object") {
if (this.callbacks[this.option]) this.callbacks[this.option]()
} else if (typeof this.callbacks == "function") {
this.callbacks(this.option)

}
this.prepare()

}
// console.log(toUnicode(key))  
break;
case 1:
 if (key == '\u001B\u005B\u0041') {
        if (this.option > 0) { this.option --;
if (this.options[this.option] && this.options[this.option].onSelection) this.options[this.option].onSelection(this)
this.update()    
}
   }
    if (key == '\u001B\u005B\u0042') {

        if (this.option < this.options.length) { this.option ++; 
if (this.options[this.option] && this.options[this.option].onSelection) this.options[this.option].onSelection(this)
this.update()    
}
}

if (key == '\u000D') {
if (this.option  == this.options.length) {
if (typeof this.callbacks == "object") {
this.options.forEach((option)=>{
if (!option.selected) return;
if (this.callbacks[option.id]) this.callbacks[option.id]()
});
} else if (typeof this.callbacks == "function") {
var r = [];
this.options.forEach((option)=>{
if (option.selected) r.push(option.id)
});
this.callbacks(r)

}
this.prepare()
} else {
this.options[this.option].onSelect(this)
this.update()
}
}
break;
case 2: 
if (key == '\u001B\u005B\u0041') return;
  if (key == '\u000D') {
    if (this.callbacks) this.callbacks(this.typed)
    this.prepare()
  } else if (key == '\u007F' && this.typed.length > 1) {
 this.typed = this.typed.substring(0, this.typed.length - 1);
 this.current[this.index].text = this.typed
    this.update()
} else 
  if (key) {
    this.typed += key
    this.current[this.index].text = this.typed
    this.update()
  }
  
break;
case 3:
  var box = this.boxes[0]
 if (key == '\u001B\u005B\u0041') {
        if (box.option > 0) { box.option --;
this.update()    
}
   }
    if (key == '\u001B\u005B\u0042') {

        if (box.option < box.options.length - 1) { box.option ++; 
this.update()    
}
}
if (key == '\u000D') {
if (box.options[box.option]) box.options[box.option].onSelect(box)

} 
  break;
case 100:
function toUnicode(theString) {
  var unicodeString = '';
  for (var i=0; i < theString.length; i++) {
    var theUnicode = theString.charCodeAt(i).toString(16).toUpperCase();
    while (theUnicode.length < 4) {
      theUnicode = '0' + theUnicode;
    }
    theUnicode = '\\u' + theUnicode;
    unicodeString += theUnicode;
  }
  return unicodeString;
}
console.log(toUnicode(key));
break;
default:

break;


}


}
centerHor(a,g) {
if (!g) g = this.width
var b = (g - a.length - 1) / 2
var c = "";
for (var i = 0; i < b; i++) {
c += " ";
}
c += a;
return this.fill(c,g)
}
fillscreen() {
process.stdout.write("\x1b[0m\u001B[s\u001B[H\u001B[6r")
  for (var b= 0; b < this.height; b++) {
     process.stdout.write(this.backround + this.fill("",this.width) + "\x1b[0m" +  EOL)
  }
process.stdout.write("\x1b[0m\u001B[0m\u001B[u");
}
update() {
 process.stdout.write("\x1b[0m\u001B[s\u001B[H\u001B[6r");
for (var b = 0; b < this.height; b++) {
var current = this.current[b]
var result = "";
var textstyle = this.textstyle;
 if (!current) result = this.backround + this.fill("",this.width) + "\x1b[0m" + EOL; else {
var backround = (current.BGcheck && current.BGcheck(this)) ? current.BG : this.backround
var text = (current.text) ? current.text : current;
textstyle = (current.textstyle) ? current.textstyle : this.textstyle
result = backround + textstyle + text + "\x1b[0m" + EOL
//console.log(text)
}
var back = (backround) ? backround : this.backround
for (var k = 0;k<this.layers.length;k++) {
if (!this.layers[k]) continue;
if (this.layers[k][b]) {
var sub = result.length - this.width
var BG = (this.layers[k][b].BGcheck && this.layers[k][b].BGcheck(this.boxes[k])) ? this.layers[k][b].BG : this.layers[k][b].defaultBG
result = result.substr(0, this.layers[k][b].start + sub) + BG + this.layers[k][b].text + back + textstyle + result.substr(this.layers[k][b].start+this.layers[k][b].len + sub);
}
}
process.stdout.write(result)
 process.stdout.write("\x1b[0m\u001B[0m\u001B[u");


}

}
init() {
process.stdout.write("\u001b[2J\u001b[0;0H");
 for (var b= 0; b < this.height; b++) {
     process.stdout.write(this.backround + this.fill("",this.width) + "\x1b[0m" +  EOL)
  }
}
wrap(string,step) {
 var length = string.length,
    array = [],
    i = 0,
    j;

while (i < length) {
    j = string.indexOf(" ", i + step);
    if (j === -1) {
        j = length;
    }

    array.push(string.slice(i, j));
    i = j;
}

return array;

}
sortLayers() {
  var final = [];
  var last = 0;
  for (var i = 0; i < this.layers.length ; i++) {
    if (!this.layers[i]) continue;
    lfinal[last] = this.boxes[i];
    this.boxes[i].index = last
    final[last] = this.layers[i];
    last ++
  }
  this.boxes = lfinal
  this.layers = final
  this.next = last;
}
getNewLayer() {
  this.sortLayers()
  
  this.layers[this.next] = [];
  this.next ++;
  return this.next - 1
}
  createInfoBox(height,width,content) {

    var b = this.height/2 - height;
    var c = this.wrap(content,width - 3);
  if (this.mode != 3) this.prev = this.mode
    this.mode = 3;
  
// console.log(c)
    var box = new Box()
    for (var i =0; i < height; i++) {
var s = this.fill("",width);
if (c[i]) s = this.centerHor(c[i],width)
var h = this.getNewLayer()
    
    this.layers[h][b] = {
      text: s,
      start: this.width/2 - width,
      len: width,
      defaultBG: '\x1b[0m\x1b[47m\x1b[30m'
    }
    b++;
    }
this.update()
  }

  prepare() {
this.width = process.stdout.columns    
   this.height = process.stdout.rows
this.current = [];
this.option = 0;
this.options = [];
this.callbacks = false;
this.sudolayer = [];
this.typed = "";
this.index = 0;
this.mode = false;
this.stdin.pause()
  this.fillscreen()  
  }
  prompt(title,desc,callback) {
    this.prepare();
    this.stdin.resume();
    this.callbacks = callback
    this.current[Math.floor(this.height/2) - 3] = this.centerHor(title);
    this.current[Math.floor(this.height/2) - 2] = this.fill(desc,this.width)
    this.mode = 2;
    this.index = Math.floor(this.height/2)
    this.current[this.index] = {
      text: " ",
      BGcheck: function(self) {
        return true
      },
      BG: "\x1b[40m",
      textstyle:"\x1b[37m"
    }
this.update()
  }
  checkList(title,options,callbacks) {
this.prepare();
this.stdin.resume()
this.mode = 1;
var a = [];
options.forEach((option,i)=>{
// console.log(id)
a[i] = {
id: i,
opt: (option.option) ? option.option : option,
text: false,
index: false,
selected: (option.selected) ? option.selected : false,
description: (option.description) ? option.description : false,
onSelection: function(self) {
if (!this.description) return self.current[self.index + self.options.length + 4] = false;

self.current[self.index + self.options.length + 4] = self.fill(this.description,self.width) 
 
},
onSelect: function(self) {
if (this.selected) {
this.selected = false;
this.text = self.fill("[ ] " + this.opt,self.width);
self.current[this.index].text = this.text


} else {
this.selected = true;
this.text = self.fill("[X] " + this.opt,self.width);
self.current[this.index].text = this.text
}
},
}
});

this.current[Math.floor(this.height/2) - options.length - 2] = this.centerHor(title);
var x = Math.floor(this.height/2) - options.length;
this.index = x;

this.options = a;
this.options.forEach((option,id)=>{
option.text = (option.selected) ? this.fill("[X] " + option.opt,this.width) : this.fill("[ ] " + option.opt,this.width);
option.index = x
this.current[x] = {
text:option.text,
id:option.id,
BGcheck: function(self) {
if (self.option == this.id) return true; else return false;
},
BG: "\x1b[7m",
}
x++;
})
this.current[x+1] = {
text: this.fill("[Done]",this.width),
id: this.options.length,
BGcheck: function(self) {
if (self.option == this.id) return true; else return false;
},
BG: "\x1b[7m",
}
 this.update()
this.callbacks = callbacks;
}

  list(title,optionss,callbacks) {
this.prepare();
this.stdin.resume()
var options = [];
optionss.forEach((option,i)=>{
options[i] = {
id:i,
opt: (option.option) ? option.option : option,
text: false,
description: (option.description) ? option.description : false,
onSelection: function(self) {
if (!this.description) return self.current[self.index + self.options.length + 3] = false;

self.current[self.index + self.options.length + 3] = self.fill(this.description,self.width) 
 
},
}

})
  this.current[Math.floor(this.height/2) - options.length - 2] = this.centerHor(title);
var x = Math.floor(this.height/2) - options.length - 2
this.options = options

if (callbacks) this.callbacks = callbacks
this.mode = 0;
x += 2
this.index = x;
options.forEach((option,id)=>{
x ++;
option.text = this.fill(option.opt,this.width);
option.BGcheck = function(self) {
if (self.option == this.id) return true; else return false;
}
option.BG = "\x1b[7m";
this.current[x] = option 
// console.log(x + " | " + this.current[x])
});
this.update()
  


  }


}
