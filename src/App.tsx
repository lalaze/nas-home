import './App.less';
import LeftPanel  from './components/leftPanel';
import store from './store/index'
import { useState, useEffect } from "react";

function App() {

  const [list, setList] = useState(([] as any[]))

  const [update, setUpdate] = useState(0)

  const [isEdit, setEdit] = useState(false)

  useEffect(() => {
    store.getAll((datas: any) => {
      console.log(datas)
      setList((datas as any[]))
    })
  }, [update])

  const editIcon = (event: any) => {
    if (event.button === 2) {
      setEdit(true)
    }
  }

  return (
    <div className="App">
      <div className="imageBg">
        <div className="iconList">
          { list.length > 0 ? list.map((item: any) => <div key={item.name} onMouseDown={editIcon} className={`icon, ${isEdit ? 'activity' : ''}`} style={{ backgroundImage: `url(${item.icon})` }}>
            {isEdit ? <div className="cover"></div> : ''}
            {isEdit ? <div className="close"></div> : ''}
          </div>) :''}
        </div>
      </div>
      <LeftPanel update={update} setUpdate={setUpdate}></LeftPanel>
    </div>
  );
}

export default App;
