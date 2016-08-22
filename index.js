"use strict"
const EOL = require('os').EOL;
module.exports = class cligui {
  
  constructor() {
this.width = process.stdout.columns    
   this.height = process.stdout.rows
  }
  fill(a,b) {
a = a.toString()
for (var i = 0; i < b - a.length + 1; i++) {
a += " ";

}
return a

}
fillscreen() {
  this.height.forEach((a)=>{
     process.stdout.write("\u001B[44m" + fill("",this.width) + EOL)
    
  })
  
}
  start() {
this.fillscreen()  
  
  }



}
