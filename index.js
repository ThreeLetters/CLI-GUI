"use strict"
const EOL = require('os').EOL;
module.exports = class cligui {
  
  constructor() {
this.width = process.stdout.columns    
   this.height = process.stdout.rows
this.current = [];
this.option = 0;
this.options = [];
this.callbacks = [];
this.index = 0;
this.mode = false;
this.textstyle = "\x1b[30m"
this.backround = "\u001B[44m"
this.stdin = process.stdin;
this.stdin.setRawMode(true);
this.stdin.resume();
this.stdin.setEncoding('utf8');

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
default:

break;


}


}
centerHor(a) {
var b = (this.width - a.length - 1) / 2
var c = "";
for (var i = 0; i < b; i++) {
c += " ";
}
c += a;
return this.fill(c,this.width)
}
fillscreen() {
process.stdout.write("\x1b[0m\u001B[s\u001B[H\u001B[6r")
  for (var b= 0; b < this.height; b++) {
     process.stdout.write(this.backround + this.fill("",this.width) + "\x1b[0m" +  EOL)
  }
process.stdout.write("\x1b[0m\u001B[0m\u001B[u");
}
update() {
 process.stdout.write("\x1b[0m\u001B[s\u001B[H\u001B[6r")
for (var b = 0; b < this.height; b++) {
var current = this.current[b]
 if (!current) process.stdout.write(this.backround + this.fill("",this.width) + "\x1b[0m" + EOL); else {
var backround = (current.BGcheck && current.BGcheck(this)) ? current.BG : this.backround
var text = (current.text) ? current.text : current;
process.stdout.write(backround + this.textstyle + text + "\x1b[0m" + EOL)
//console.log(text)
}
 process.stdout.write("\x1b[0m\u001B[0m\u001B[u");


}

}
init() {
process.stdout.write("\u001b[2J\u001b[0;0H");
 for (var b= 0; b < this.height; b++) {
     process.stdout.write(this.backround + this.fill("",this.width) + "\x1b[0m" +  EOL)
  }
}
  prepare() {
this.width = process.stdout.columns    
   this.height = process.stdout.rows
this.current = [];
this.option = 0;
this.options = [];
this.callbacks = [];
this.index = 0;
this.mode = false;
this.stdin.pause()
  this.fillscreen()  
  }
  prompt(title,desc,callback) {
    this.prepare();
    this.stdin.resume();
    this.current[Math.floor(this.height/2) - 3] = this.centerHor(title);
    this.current[Math.floor(this.height/2) - 2] = this.fill(desc,this.width)
    this.mode = 2;
    
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
if (!this.description) return self.current[self.index + self.options.length + 3] = false;

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
