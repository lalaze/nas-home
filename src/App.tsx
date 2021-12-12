import './App.less';
import LeftPanel  from './components/leftPanel';
import store from './store/index'
import { useState, useEffect } from "react";

function App() {

  const [list, setList] = useState(([] as any[]))

  useEffect(() => {
    store.getAll((datas: any) => {
      setList((datas as any[]))
    })
  }, [])

  return (
    <div className="App">
      <div className="imageBg">
        <div className="iconList">
          { list.length > 0 ? list.map((item: any) => <div className="icon" style={{ backgroundImage: `url(${item.icon})` }}></div>) :''}
        </div>
      </div>
      <LeftPanel></LeftPanel>
    </div>
  );
}

export default App;
