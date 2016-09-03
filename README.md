# CLI-GUI
A simple way to have a graphical interface through command line


## Usage
>npm install cligui


#### Using it in your code
```
var CLIGUI = require('cligui')
var cligui = new CLIGUI()
```

### Features
* File editor
* list interface
* checklist
* prompts
* popup boxes

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
