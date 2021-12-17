
const {setIcon, getAllIcon, updateIcon} = require('./api')

const main_handler = async (event, context) => {
    const name = event.name; 
    const res = await getAllIcon()
    return res
};

module.exports =  { main_handler }
