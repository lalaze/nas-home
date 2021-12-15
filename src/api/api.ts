import { userName, password } from './config'
import { MongoClient } from "mongodb"

const uri = `mongodb+srv://${userName}:${password}@cluster0.7jtaj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

// 数组结构
// {icon: string, name: string, url: string, }

// 还有一个monggo的默认id
// 写死我的名字去建立一个表，懒得搞账号体系了
type IconProps = {
  icon: string,
  name: string,
  url: string
}

async function setIcon(data: IconProps){
  const client = new MongoClient(uri);
  await  client.connect();
  // 写死的用户名
  const cmd = client.db('lalaze').collection('IconList');
  const res = await cmd.insertOne(data)
  client.close()
  return res
}

setIcon({
  url: 'test',
  name: 'test',
  icon: 'test'
})

async function getAllIcon(){
  const client = new MongoClient(uri);
  await  client.connect();
  const cmd = client.db('test').collection('cmd');
  const res = await cmd.find({},{ projection: {'_id':0,name:1}}).toArray();
  client.close()
  return res
}

async function updateIcon(){
  const client = new MongoClient(uri)
  await  client.connect();
  const cmd = client.db('test').collection('cmd');
  const res = await cmd.find({},{ projection: {'_id':0,name:1}}).toArray();
  client.close()
  return res
}