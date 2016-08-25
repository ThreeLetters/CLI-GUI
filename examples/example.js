"use strict"

const c = require('../lib/cligui.js');
var CliGui = new c()
function home() {
var options = [
  {option: "prompt",description: "Typing interface"},
  {option: "checklist",description: "Checklist interface"},
  {option: "list",description: "List"},
  {option: "Popup",description: "popup box"}
  ];
var callbacks = [
function() {
  CliGui.prompt("Prompt","Type.",function() {
   
    home()
    return true;
  })
  return true;
},
function() {
  CliGui.checkList("Checklist",["optionA","optionB","optionC"],function() {
    home()
    return true;
  })
  return true
},
function() {
  CliGui.list("list",["option1","option2","option3"],function() {
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
}
home()
CliGui.createInfoBox(25,6,"Welcome to the CLI-GUI Tour!");
