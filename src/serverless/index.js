const api = require('./api')

const main_handler = async (event, context) => {
    const { method, data } = event.queryString
    const res = await api[method](data)
    return {
        "isBase64Encoded": false,
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": JSON.stringify({'result': res})
    }
};

module.exports =  { main_handler }