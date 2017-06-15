## CLIGUI2 - https://github.com/ThreeLetters/CLI-GUI2


[![NPM](https://img.shields.io/badge/Module-Npm-blue.svg)](https://www.npmjs.com/package/cli-gui)
[![Donate](https://img.shields.io/badge/Donate-Paypal-brightgreen.svg)](https://paypal.me/andrews54757)


![screen shot 2016-09-03 at 12 53 02 pm](https://cloud.githubusercontent.com/assets/13282284/18226358/f9109dec-71d5-11e6-8203-09e54905e78a.png)

# CLI-GUI
A simple way to have a graphical interface through command line


## Usage
>npm install cli-gui


#### Using it in your code
```
var CLIGUI = require('cli-gui')
var cligui = new CLIGUI()
```

### Features
* File editor
* list interface
* checklist
* prompts
* popup boxes
* Works for most operating systems

### Example
``node examples/example.js``

##### File editor
```
cligui.editor('./file.js',function(returnedfile) {
// your callback
})
```

##### List
```
var objects = [
"item0",
"item1",
"item2",
{option: "item3",description: "You can even add descriptions!"}
]
var callbacks = [
function() {}, // item0
function() {}, // item1
function() {}, // item2
function() {}  // item3
]
/*
Note that you can even have the callback in this format:
var callbacks = function(selected) {
switch (selected) {
 case 0:
 
 break;
 case 1:
 
 break;
 case 2
 
 break;
 case 3
 
 break;
}
}
*/

cligui.list("menu name",objects,callbacks)
```


Checklist


```

var objects = [
"item0",
"item1",
"item2",
{option: "item3",description: "You can add descriptions!",selected: true} // you can also have it selected by default
]
var callbacks = [
function() {}, // item0
function() {}, // item1
function() {}, // item2
function() {}  // item3
]

/* 
The callbacks could also be:

var callbacks = function(selected) { // selected would be a object (EG: [0,2,3] if 0,2 and 3 is selected)
if (selected.indexOf(0) != -1) {} // 0
if (selected.indexOf(1) != -1) {} // 1
if (selected.indexOf(2) != -1) {} // 2
if (selected.indexOf(3) != -1) {} // 3
}
*/

cligui.checkList("checklist title",options,callbacks)
```


Prompt


```
cligui.prompt("Prompt title", "prompt description", function(typed) {
// callback
})
```


Basic Popup Box


```
cligui.createInfoBox(30,5,"Contents of box",0,0,function() { // createInfoBox(width,height,contents,x,y,callback)
// callback
})
```

Coordinate system


```
(0,0) -> center
(100,50) -> top right
(-100,-50) -> bottom left

X: -100 - 100

Y: -50 - 50

```
