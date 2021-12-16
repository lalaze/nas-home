const { userName, password } = require('./config')
const { MongoClient } = require("mongodb")

const uri = `mongodb+srv://${userName}:${password}@cluster0.7jtaj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

// 数组结构
// {icon: string, name: string, url: string, }

// 还有一个monggo的默认id
// 写死我的名字lalaze去建立一个表，懒得搞账号体系了

async function setIcon(data){
  const client = new MongoClient(uri);
  await  client.connect();
  // 写死的用户名
  const cmd = client.db('lalaze').collection('IconList');
  const res = await cmd.insertOne(data)
  client.close()
  return res
}

async function getAllIcon(){
  const client = new MongoClient(uri);
  await  client.connect();
  const cmd = client.db('lalaze').collection('IconList');
  const res = await cmd.find().toArray();
  client.close()
  return res
}

async function updateIcon(data){
  const client = new MongoClient(uri)
  await  client.connect();
  const cmd = client.db('lalaze').collection('IconList');
  const filter = { id: data.id };
  const options = { upsert: true };
  const updateDoc = {
    $set: data
  }
  const res = await cmd.updateOne(filter, updateDoc, options)
  client.close()
  return res
}


module.exports = {setIcon, getAllIcon, updateIcon}