"use strict"
module.exports = class Utilities {
constructor(main) {
this.main = main

}
centerHor(a,g,k) {
if (!g) g = this.main.width
if (!k) k = a.length
var f = Math.abs(a.length - k)
var b = (g - k - 1) / 2
var c = "";
for (var i = 0; i < b; i++) {
c += " ";
}
c += a;
return this.main.fill(c,g,c.length - f)
}
 fill(a,b,k) {
a = a.toString()
if (!k) k = a.length
var c = b - k
for (var i = 0; i < c; i++) {
a += " ";
}
return a
}
wrap(string,maxlen) {
var results = [];

while (0==0) {
if (string.length < maxlen) {
results.push(string);
break;
}
var s = string.substring(0,maxlen);
var index = s.lastIndexOf(" ");
if (index != -1) {
results.push(s.substring(0,index))
string = string.substring(index + 1)
} else {
results.push(string);
break;
}
}


return results;

}
}
