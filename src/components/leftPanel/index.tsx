import React, { useState } from "react";
import "./leftPanel.less";
import Edit from '../edit/edit'

const LeftPanel: React.FC = () => {
  const [show, setShow] = useState(false)
  return (
    <div className="bg">
      {show ? <Edit></Edit> : ''}
      <div
        className="panelIcon"
        onClick={() => {
          setShow(true);
        }}
      ></div>
    </div>
  );
};

export default LeftPanel;
