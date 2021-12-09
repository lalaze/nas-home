import React from "react";
import "./edit.less";

const Edit: React.FC = () => {
  return (
    <div className="edit leftIn">
      <div className="head">
        <div className="addArea">
          <div className="add"></div>
          <span>添加</span>
        </div>
        <div className="close"></div>
      </div>
      <div className="content"></div>
    </div>
  );
};

export default Edit;
