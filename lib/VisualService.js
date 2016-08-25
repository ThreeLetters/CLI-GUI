module.exports = class VisualService {
constructor(main) {
this.main = main
}
stop() {
  process.stdout.write('\u001B[0r')
process.stdout.write("\u001b[2J\u001b[0;0H");
  
}

fillscreen() {
process.stdout.write("\x1b[0m\u001B[s\u001B[H\u001B[2r")
  for (var b= 0; b < this.main.height; b++) {
     process.stdout.write(this.main.backround + this.main.fill("",this.main.width) +  EOL)
  }
process.stdout.write("\x1b[0m\u001B[0m\u001B[u");
}
update() {
var debug = true;
var debug = false;
if (!debug) process.stdout.write("\x1b[0m\u001B[s\u001B[H\u001B[2r");
for (var b = 0; b < this.main.height; b++) {
var current = this.main.current[b]
var result = "";
var textstyle = this.main.textstyle;
 if (!current) result = this.main.backround + this.main.fill("",this.main.width) + EOL; else {
var backround = (current.BGcheck && current.BGcheck(this.main)) ? current.BG : this.main.backround
var text = (current.text) ? current.text : current;
textstyle = (current.textstyle) ? current.textstyle : this.main.textstyle
result = backround + textstyle + text + EOL
//console.log(text)
}
var back = (backround) ? backround : this.main.backround
for (var k = 0;k<this.main.layers.length;k++) {
if (!this.main.layers[k]) continue;
if (this.main.layers[k][b]) {
var sub = result.length - this.main.width
if (this.main.layers[k][b].selectonly) {
  var layer = this.main.layers[k][b];
var final = "";
var eww = false;
var char = 0;
var abc = 0;
var stopped = false;
  layer.options.every((opt,ina)=>{
    var BG = (opt.BGcheck && opt.BGcheck(this.main.boxes[k])) ? opt.BG : layer.defaultBG
    var ref = (eww) ? " " : "";
    eww = true
if (char >= layer.width) {
stopped = ini

return false;
}
abc += opt.opt.length
final += ref + BG + opt.opt + layer.defaultBG
    char += opt.opt.length;
    return true
  })
// throw "s"
if (debug) console.log(this.main.centerHor(final,layer.width,abc))
result = result.substr(0, layer.start + sub) + layer.defaultBG + this.main.centerHor(final,layer.width,abc) + back + textstyle + result.substr(layer.start+layer.len + sub);
if (stopped) {
  var y = b + 1
    this.main.layers[k][y] = {
      start: layer.start,
      selectonly: true,
      options: layer.options.slice(stopped),
      width: layer.width
    }
   
  
  
}
  
} else {
var BG = (this.main.layers[k][b].BGcheck && this.main.layers[k][b].BGcheck(this.main.boxes[k])) ? this.main.layers[k][b].BG : this.main.layers[k][b].defaultBG
if (debug) console.log(this.main.layers[k][b].text)
result = result.substr(0, this.main.layers[k][b].start + sub) + BG + this.main.layers[k][b].text + back + textstyle + result.substr(this.main.layers[k][b].start+this.main.layers[k][b].len + sub);
}
  
}
}
if (!debug) process.stdout.write(result)
if (!debug) process.stdout.write("\x1b[0m\u001B[0m\u001B[u");


}

}
init() {
process.stdout.write("\u001b[2J\u001b[0;0H");
 for (var b= 0; b < this.main.height; b++) {
     process.stdout.write(this.main.backround + this.main.fill("",this.main.width) + "\x1b[0m" +  EOL)
  }
}

}
