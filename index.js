var c = require('./lib/cligui');
var cligui = new c()

module.exports = {
list: cligui.list,
checkList: cligui.checkList,
prompt: cligui.prompt,
createInfoBox: cligui.createInfoBox,
prepare: cligui.prepare


}
