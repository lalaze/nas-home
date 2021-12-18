const api = require('./api')

const post = async (body) => {
    console.log('zeze', body)
    const bodyData = JSON.parse(body)
    const { method, data } = bodyData
    let res = ''
    if (method) {
        res = await api[method](data)
    }
    return res
}

const main_handler = async (event, context) => {
    let res = 'no Method'
    // 判断是不是post
    if (event.httpMethod == "POST") {
        res = await post(event.body)
    }
    return {
        "isBase64Encoded": false,
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Headers": "Content-Type",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers-Methods": "POST OPTIONS"
        },
        "body": JSON.stringify({'result': res})
    }
    
};

module.exports =  { main_handler }
