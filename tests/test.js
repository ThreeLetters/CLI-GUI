"use strict"

const c = require('../lib/cligui.js');
var CliGui = new c()
CliGui.prompt("test title", "prompt test", function(a){throw a})
