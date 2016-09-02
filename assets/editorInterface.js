"use strict";

module.exports = class EditorInterface {
constructor(main,out,callback,width,height) {
this.main = main
this.in = out;
this.callback = callback;
this.width = (width) ? width : this.main.width;
this.height = (height) ? height : this.main.height;
this.init()
this.result = [];
this.cursor = {
  x: 0,
  y: 0
}
}
init() {
  
}


}
