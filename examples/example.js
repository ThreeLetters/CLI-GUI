"use strict"

const c = require('../lib/cligui.js');
var CliGui = new c()
var out = false;
function home() {
  
var options = [
  {option: "prompt",description: "Typing interface"},
  {option: "checklist",description: "Checklist interface"},
  {option: "list",description: "List"},
  {option: "Popup",description: "popup box"}
  ];
var callbacks = [
function() {
  CliGui.prompt("Prompt","Type.",function(a) {
   out = "You inputed " + a;
    home()
    return true;
  })
  return true;
},
function() {
  CliGui.checkList("Checklist",["option0","option1","option2"],function(a) {
    out = "you selected options:";
    var r = false;
    a.forEach((d)=>{
      var g = (r) ? ", " : " ";
    out += g + d;
    })
    home()
    return true;
  })
  return true
},
function() {
  CliGui.list("list",["option0","option1","option2"],function(a) {
    out = "you selected " + a;
    home();
    return true
  })
  return true
},
function() {
  CliGui.createInfoBox(20,5,"This is a popup box!")
  return true;
}
]
  
CliGui.list("Example",options,callbacks );
if (out) {
    CliGui.createInfoBox(25,6,out)
    out = false;
  }
}
home()
CliGui.createInfoBox(25,6,"Welcome to the CLI-GUI Tour!");
