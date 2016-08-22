"use strict"
const EOL = require('os').EOL;
module.exports = class cligui {
  
  constructor() {
this.width = process.stdout.columns    
   this.height = process.stdout.rows
  }
  fill(a,b) {
a = a.toString()
var c = b - a.length + 1
for (var i = 0; i < c; i++) {
a += " ";

}
return a

}
fillscreen() {
  for (var b= 0; b < this.height/2; b++) {
     process.stdout.write("\u001B[44m" + this.fill("",this.width) + EOL)
  }
}
  prepare() {
this.fillscreen()  
  this.fillscreen()  
  }
  list() {

  }


}
