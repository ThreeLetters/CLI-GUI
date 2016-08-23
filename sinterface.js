module.exports = function(text,id,others) {
var a = {
text: text,
id:id,
BGcheck: function(self) {
if (this.id = self.option) return true; else return false;

}
BG: '\x1b[7m',
}

others.forEach((o,i)=>{
  a[i] = o
  
})
return a;

}
