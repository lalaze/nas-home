import React, { useState } from "react";
import "./edit.less";
import { Input } from "antd";
import UploadCard from "../upload/index";
import { GlobalOutlined, FieldStringOutlined } from "@ant-design/icons";
import { TwitterPicker } from 'react-color';

const Edit: React.FC = () => {
  const [color, setColor] = useState('rgb(255, 105, 0)')

  const [site, setSite] = useState('')

  const [name, setName] = useState('')

  return (
    <div className="edit leftIn">
      <div className="head">
        <div className="addArea">
          <div className="add"></div>
          <span>添加</span>
        </div>
        <div className="close"></div>
      </div>
      <div className="content">
        <div className="card">
          <Input
            className="card-item"
            size="large"
            placeholder="网站地址"
            value={site}
            onChange={(e) => {
              setSite(e.target.value)
            }}
            prefix={<GlobalOutlined />}
          />
          <Input
            className="card-item"
            size="large"
            placeholder="网站名字"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
            prefix={<FieldStringOutlined />}
          />
          <div className="uploadArea">
            <div className="label">图标</div>
            <div className="list">
              <div className="colorArea">
                <div className="block" style={{background: color}}>
                  <div className="text">{name.slice(0,2)}</div>
                </div>
                <div className="text">纯色图标</div>
              </div>
              <UploadCard></UploadCard>
            </div>
          </div>
          <div className="colorPicker">
            <TwitterPicker
              color={ color }
              onChangeComplete={(color:any) => {
                setColor(color.hex)
              } }
            ></TwitterPicker>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
