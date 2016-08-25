"use strict"

const c = require('../lib/cligui.js');
var CliGui = new c()
function home() {
var options = [
  {opt: "prompt",description: "Typing interface"},
  {opt: "checklist",description: "Checklist interface"},
  {opt: "list",description: "List"},
  {opt: "Popup",description: "popup box"}
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
  CliGui.checkList("Checklist", "Convienient",["optionA","optionB","optionC"],function() {
    home()
    return true;
  })
  return true
},
function() {
  CliGui.list("list","same as back there",["option1","option2","option3"],function() {
    home();
    return true
  })
  return true
},
function() {
  CliGui.createInfoBox(20,5,"This is a popup box!")
  return false
}
]
  
CliGui.list("Example", "Choose an option using arrows and enter and see what it does",options,callbacks );
CliGui.createInfoBox(25,6,"Welcome to the CLI-GUI Tour!");
}
home()
