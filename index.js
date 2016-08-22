"use strict"
const EOL = require('os').EOL;
module.exports = class cligui {
  
  constructor() {
this.width = process.stdout.columns    
   this.height = process.stdout.rows
this.current = [];
this.option = false;
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
        if (this.option > 0) this.option --;
this.update()
    }
   
    if (key == '\u001B\u005B\u0042') {
        if (this.option < this.options.length) this.option ++; 
this.update()    
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
// console.log(current)
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
this.option = false;
this.options = [];
this.callbacks = [];
this.index = 0;
this.mode = false;
  this.fillscreen()  
  }
  list(title,optionss,callbacks) {
this.prepare();
var options = [];
optionss.forEach((option,i)=>{
options[i] = {
id:i,
opt:option,
text: false,
}

})
  this.current[Math.floor(this.height/2) - options.length - 2] = this.centerHor(title);
var x = Math.floor(this.height/2) - options.length - 2
this.options = options

this.callbacks = callbacks
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
