'use strict';
var {getAllCmdName, getDocByName} = require('./mongo')

module.exports = async (event, context) => {
    console.log(event)
    var name = event.name; 
    var res = await getDocByName(name)
    return res
};