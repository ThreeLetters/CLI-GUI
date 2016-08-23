"use strict"

module.exports = class Box {
constructor(width,height,options,main) {
this.width = width;
this.height = height;
this.options = options;
this.index = false;
this.main = main
this.selected = 0;
}
remove() {
this.main.layers[this.index] = false;
this.main.boxes[this.index] = false;
this.main.sortLayers()
}



}
