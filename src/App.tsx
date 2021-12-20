import './App.less';
import LeftPanel  from './components/leftPanel';
import { message } from "antd";
import { useState, useEffect } from "react";
import { getAllIcon, deleteIcon } from './api/index'

function App() {

  const [list, setList] = useState(([] as any[]))

  const [update, setUpdate] = useState(0)

  const [isEdit, setEdit] = useState(false)

  const [editData, setEditData] = useState(null as any)

  const [editId, setEditId] = useState('')

  useEffect(() => {
    updateAllIcon()
  }, [update])

  const updateAllIcon = () =>{
    getAllIcon().then((res) => {
      if (res) {
        setList(res)
      }
    })
  }

  const closeEdit = () => {
    setEdit(false)
    window.removeEventListener('click', closeEdit)
  }

  const editIcon = (event: any) => {
    if (event.button === 2) {
      setEdit(true)
      window.addEventListener('click', closeEdit)
    }
  }

  const deleteIconAndUpdate = (item: any) => {
    deleteIcon({ 'id' : item.id}).then((res) => {
      if (res.result.deletedCount === 1) {
        message.success('删除成功')
        updateAllIcon()
      }
    })
  }

  const open = (url: string) => {
    if (!isEdit) {
      window.location.href = url
    }
  }

  const mouseMove = (item: any) => {
    if (editId !== item.id) {
      setEditId(item.id)
    }
  }

  const mouseOut = (item: any) => {
    if (editId === item.id) {
      setEditId('')
    }
  }

  return (
    <div className="App">
      <div className="imageBg" style={{ backgroundImage: (window as any).newBg || '' }}>
        <div className="iconList">
          { list.length > 0 ? list.map((item: any) => <div key={item.id} onMouseDown={editIcon} 
          onClick={(e) => { 
            e.stopPropagation()
            open(item.url) 
          }}
          onMouseEnter={() => {
            mouseMove(item)
          }}
          onMouseLeave={() => {
            mouseOut(item)
          }}
          className={`icon ${isEdit ? 'activity' : ''}`} 
          style={{ backgroundImage: `url(${item.icon})` }}>
            {isEdit && editId === item.id ? <div className="editIconBg" onClick={() => {
              setEditData(item)
            }}>
              <div className="editIcon"></div>
            </div>
             : ''}
            {isEdit ? <div className="cover"></div> : ''}
            {isEdit ? <div className="close" onClick={(e) => {
                e.stopPropagation()
                deleteIconAndUpdate(item)
              }}></div> : ''}
          </div>) :''}
        </div>
      </div>
      <LeftPanel editData={editData} setEditData={setEditData}
      update={update} setUpdate={setUpdate}></LeftPanel>
    </div>
  );
}

export default App;
