import React, { useState } from "react";
import "./edit.less";
import { Input, Button, message } from "antd";
import UploadCard from "../upload/index";
import { GlobalOutlined, FieldStringOutlined } from "@ant-design/icons";
import { TwitterPicker } from 'react-color';

const Edit: React.FC<{ setShow: Function}> = (props: any) => {
  const [color, setColor] = useState('rgb(255, 105, 0)')

  const [site, setSite] = useState('')

  const [name, setName] = useState('')

  const [img, setImg] = useState('')

  const { setShow } = props

  let edit: any = null

  const gogogo = () => {
    if (!site || !name) {
      message.error('请填写完整再提交')
    }
  }

  return (
    <div className="edit leftIn" ref={(ref)=>{edit = ref}}>
      <div className="head">
        <div className="addArea">
          <div className="add"></div>
          <span>添加</span>
        </div>
        <div className="close" onClick={() => {
          edit.classList.add('leftOut')
          setTimeout(() => {setShow(false)}, 650)
        }}></div>
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
              {img ? <div className="Icon" style={{ backgroundImage: img ? `url(${img})` : ''}}>
                <div className="cover"></div>
                <div className="close" onClick={() => {setImg('')}}></div>
              </div> 
              : <UploadCard setImg={setImg}></UploadCard>}
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
          <div className="buttonList">
            <Button className="submit" type="primary" onClick={gogogo}>保存</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
