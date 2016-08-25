"use strict";
module.exports = class Coords {
constructor(main) {
this.main = main;
this.xrange = 50;
this.yrange = 25;
}
toReal(x,y) {
  var xdif = this.main.width / xrange * 2;
  var ydif = this.main.height / yrange * 2;
  x += xrange;
  y += yrange;
  return {x: Math.floor(x * xdif),y: Math.floor(this.main.height - (y * ydif))}
}
toRelative(x,y) {
 var xdif = this.main.width / xrange * 2;
  var ydif = this.main.height / yrange * 2;
  x += xrange;
  y += yrange;
  return {x: Math.floor(x / xdif),y: Math.floor((this.main.height - y) / ydif)}


}

}
