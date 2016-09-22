"use strict"
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
const SelectionInterface = require('./sinterface.js')
module.exports = class Box {
constructor(width,height,top,start,options,index,main,callback) {
this.width = width;
this.height = height;
this.callback = callback;
this.options = options;
this.index = index;
this.top = top
this.start = start;
this.main = main
this.option = 0;
if (!this.options) this.genOpt()
  
}
generateOpt(opt) {
/*
uses

option = {
opt: [option name],
onSelect: function()
}

*/


  var a = this.top + this.height
  var o = [];
  var k = [];
  var id = 0;
  opt.forEach((optt)=>{
    o.push({
      opt: optt.opt,
      onSelect: optt.onSelect
    })

    k.push(
      SelectionInterface(" ",id,{
        start: this.start,
      opt: optt.opt,
      width: this.width},this.main)
      
      
    )
    id ++;
  })
  this.main.layers[this.index][a] = {   len: this.width,width:this.width, defaultBG: '\x1b[0m\x1b[47m\x1b[30m', start: this.start ,selectonly: true, options:k}
this.options = []
  this.options = o;
  
}
onKey(key) {
   if (key == '\u001B\u005B\u0041') {
        if (this.option > 0) { this.option --;
this.main.update()    
}
   }
    if (key == '\u001B\u005B\u0042') {

        if (this.option < this.options.length - 1) { this.option ++; 
this.main.update()    
}
}
if (key == '\u000D') {
this.runOpt(this.option)

} 
  
}
runOpt(opt) {
  if (!this.options[opt] || !this.options[opt].onSelect) return;
  var b = this.options[opt].onSelect(this)
  if (b == "remove") return this.remove();
}

remove() {
this.main.removeBox(this.index)
if (callback) callback()
}

genOpt() {
  var a = this.top + this.height
  this.main.layers[this.index][a] = {   len: this.width,width:this.width, defaultBG: '\x1b[0m\x1b[47m\x1b[30m', start: this.start ,selectonly: true, options:[SelectionInterface(this.main.centerHor("[Close]",this.width),0,{start: this.start,
   
      opt: "[Close]",
      width: this.width},this.main)]}
this.options = []
  this.options[0] = {
    text: this.main.centerHor("[Close]",this.width),
    opt: "[Close]",
    onSelect: function() {
      return "remove"
    }
  }
  
  
}


}
