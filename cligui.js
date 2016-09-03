"use strict"
const EOL = require('os').EOL;
const Files = require('./lib/Files.js')
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
this.typed = "";
this.dontreset = false;
this.textstyle = "\x1b[30m"
this.backround = "\u001B[44m"
this.inputHandler = new Files.InputHandler(this);
this.util = new Files.Utilities(this)
this.visual = new Files.VisualService(this);
this.coords = new Files.Coords(this)
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

stop() {
  this.prepare(true)
  this.fillscreen()
  this.visual.stop()
}
dataRecieved(key) {
this.inputHandler.dataRecieved(key)
}
centerHor(a,g,k) {
return this.util.centerHor(a,g,k)
}
 fill(a,b,k) {
return this.util.fill(a,b,k);
}
wrap(string,maxlen) {
return this.util.wrap(string,maxlen)
}


fillscreen() {
return this.visual.fillscreen()
}
update() {
return this.visual.update()
}
init() {
return this.visual.init();
}

removeBox(id) {
this.layers[id] = false;
this.boxes[id] = false;
this.sortLayers()
if (!this.boxes[0]) {this.mode = this.prev;
this.prev = false
}
this.update()
}
sortLayers() {
  var final = [];
  var last = 0;
var lfinal = [];
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
removeEditor() {
this.editor = null;
this.prepare();
}
editor(file,call) {
  this.prepare()
   this.stdin.resume();
   this.mode = 5
this.editor = new Files.Assets.EditorInterface(this,require('fs').readFileSync(file,"utf8"),function(a) {
  if (call) return call(a)
  if(a) require('fs').writeFileSync(file,a,"utf8")
  
},"Editing " + file,this.width,this.height,function(a) {
this.current = a;
this.update()
}.bind(this))
}
  createInfoBox(width,height,content,x,y,callback) {
if (!x) x = 0;
if (!y) y = 0;

var st = this.coords.toReal(x,y)
var sta = st.x - Math.floor(width/2);
    var b = st.y - Math.floor(height/2);
    var c = this.wrap(content,width - 2);
  if (this.mode != 3) this.prev = this.mode
    this.mode = 3;
var h = this.getNewLayer()  
    var box = new Files.Assets.Box(width,height,b,sta,false,h,this,callback)
this.boxes[h] = box
    for (var i =0; i < height; i++) {
var s = this.fill("",width);
if (c[i]) s = this.centerHor(c[i],width)

    
    this.layers[h][b] = {
      text: s,
      start: sta,
      len: width,
      defaultBG: '\x1b[0m\x1b[47m\x1b[30m'
    }
    b++;
    }


this.update()
// console.log(this.layers)
  }

  prepare(er) {
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
this.typed = "";
this.stdin = process.stdin;
this.stdin.pause()
 if (!this.dontreset && !er) this.fillscreen()  
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
      text: this.fill("",this.width),
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
select: (option.select) ? option.select : function(a,b) {},
selection: (option.selection) ? option.selection : function(a,b) {},
description: (option.description) ? option.description : false,
onSelection: function(self) {
  this.select(this,self)
if (!this.description) return self.current[self.index + self.options.length + 4] = false;
self.current[self.index + self.options.length + 4] = self.fill(this.description,self.width) 
 
},
onSelect: function(self) {
  this.selection(this,self)
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
select: (option.select) ? option.select : function(a,b) {},
description: (option.description) ? option.description : false,
onSelection: function(self) {
  this.select(this,self);
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
