import React, { useState } from "react";
import "./leftPanel.less";
import Edit from '../edit/edit'

const LeftPanel: React.FC<{setUpdate: Function, 
  update: number, editData: any, setEditData: any}> = (props: any) => {
  const [show, setShow] = useState(false)

  const { update, setUpdate, editData, setEditData } = props

  return (
    <div className="bg">
      {show || editData ? <Edit editData={editData} setEditData={setEditData} update={update} 
      setUpdate={setUpdate} setShow={setShow}></Edit> : ''}
      <div
        className="panelIcon"
        onClick={() => {
          setShow(true)
        }}
      ></div>
    </div>
  );
};

export default LeftPanel;
