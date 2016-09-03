"use strict"

const c = require('../cligui.js');
var CliGui = new c()
var out = false;
function home() {
  
var options = [
  {option: "prompt",description: "Typing interface"},
  {option: "checklist",description: "Checklist interface"},
  {option: "list",description: "List"},
  {option: "Popup",description: "popup box"},
  {option: "Editor",description: "edit files"}
  ];
var callbacks = [
function() {
  CliGui.prompt("Prompt","Type.",function(a) {
   out = "You inputed " + a;
    home()
    
  })
  
},
function() {
  CliGui.checkList("Checklist",["option0","option1","option2"],function(a) {
    out = "you selected options:";
    var r = false;
    a.forEach((d)=>{
      var g = (r) ? ", " : " ";
      r = true;
    out += g + d;
    })
    home()
    
  })
  
},
function() {
  CliGui.list("list",["option0","option1","option2"],function(a) {
    out = "you selected " + a;
    home();
    
  })
  
},
function() {
  CliGui.createInfoBox(20,5,"This is a popup box!")
  
},
function() {
  CliGui.editor('./editme',function() {
    out = "Check out the file editme to see your edits"
    setTimeout(function() {home()},1000);
  })
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
