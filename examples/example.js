"use strict"

const c = require('../lib/cligui.js');
var CliGui = new c()
var options = [
  {opt: "prompt",description: "Typing interface"},
  {opt: "checklist",description: ""},
  {},
  {}
  
  ]
CliGui.list("Example", "Choose an option using arrows and enter and see what it does",options );
CliGui.createInfoBox(25,6,"Welcome to the CLI-GUI Tour!");
