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
```
