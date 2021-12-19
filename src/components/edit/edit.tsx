import React, { useState, useEffect } from "react";
import "./edit.less";
import { Input, Button, message } from "antd";
import UploadCard from "../upload/index";
import { GlobalOutlined, FieldStringOutlined } from "@ant-design/icons";
import { TwitterPicker } from 'react-color';
import html2canvas from 'html2canvas'
import { setIcon, updateIcon } from '../../api/index'
import { v4 as uuidv4 } from 'uuid';
import CropperArea from '../cropper/index'

const Edit: React.FC<{ setShow: Function, update: Function, 
  setUpdate: Function, editData: any, setEditData: any}> = (props: any) => {
  const [color, setColor] = useState('rgb(255, 105, 0)')

  const [site, setSite] = useState('')

  const [name, setName] = useState('')

  const [img, setImg] = useState('')

  const [file, setFile] = useState('')

  const [uploadAgain, setUploadAgain] = useState(false)

  const { setShow, setUpdate, update, editData, setEditData } = props

  let edit: any = null

  useEffect(() => {
    if (editData) {
      setSite(editData.url)
      setName(editData.name)
      if (editData.isImg) {
        setImg(editData.icon)
      }
    }
  }, [editData])

  const gogogo = () => {
    if (!site || !name) {
      message.error('请填写完整再提交')
      return
    }
    // 拼数据
    if (!img) {
      // 没传图像
      html2canvas((document.getElementById('icon') as HTMLElement), {
        useCORS: true, // 【重要】开启跨域配置
        scale: window.devicePixelRatio < 3 ? window.devicePixelRatio : 2,
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        if (editData) {
          updateMyIcon(imgData, false)
        } else {
          saveIcon(imgData, false)
        }
      })
    } else {
      if (editData) {
       updateMyIcon(img, true)
      } else {
        saveIcon(img, true)
      }
    }
  }

  const saveIcon = (icon: any, isImg: boolean) => {
    setIcon({
      id: uuidv4(),
      name,
      url: site,
      icon,
      isImg
    }).then((res) => {
      if (res.result.insertedId) {
        setUpdate(update + 1)
        message.success('保存成功')
        clear()
      }
    })
  }

  const updateMyIcon = (icon: any, isImg: boolean) => {
    updateIcon({
      id: editData.id,
      name,
      url: site,
      icon,
      isImg
    }).then((res) => {
      if (res.result.modifiedCount) {
        setUpdate(update + 1)
        message.success('保存成功')
        clear()
      }
    })
  }

  const clear = () => {
    setColor('rgb(255, 105, 0)')
    setSite('')
    setImg('')
    setName('')
  }

  const closeAn = () => {
    edit.classList.add('leftOut')
    setTimeout(() => {
      setShow(false)
      setEditData(null)
    }, 650)
  }

  const mouseMove = () => {
    setUploadAgain(true)
  }

  const mouseOut = () => {
    setUploadAgain(false)
  }

  const uploadAgainInput = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    const event = new MouseEvent('click')
    input.onchange = (e: any) => {
      const file = e.target.files[0]
      const fileReader = new FileReader()
      fileReader.onload = (ee: any) => {
        // 获取得到的结果
        setFile(ee.target?.result)
      }
      fileReader.readAsDataURL(file)
    }
    input.dispatchEvent(event)
  }

  return (
    <div className="edit leftIn" ref={(ref)=>{edit = ref}} onClick={(e) => {
      e.stopPropagation()
    }}>
      <div className="head">
        <div className="addArea">
          <div className="add"></div>
          <span>{ editData ? '修改' : '添加' }</span>
        </div>
        <div className="close" onClick={closeAn}></div>
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
                <div className="block" style={{background: color}} id="icon">
                  <div className="text">{name.slice(0,2)}</div>
                </div>
                <div className="text">纯色图标</div>
              </div>
              {img ? <div className="Icon" 
              onMouseEnter={mouseMove}
              onMouseLeave={mouseOut}
              style={{ backgroundImage: img ? `url(${img})` : ''}}>
                {uploadAgain ? <div className="editIconBg" onClick={() => {
                  uploadAgainInput()
                }}>
                  <div className="editIcon"></div>
                </div>
                 : ''}
                <div className="cover"></div>
                <div className="close" onClick={() => {setImg('')}}></div>
              </div> 
              : <UploadCard setFile={setFile} setImg={setImg}></UploadCard>}
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
      {file ? <CropperArea file={file}  setImg={setImg} setFile={setFile}></CropperArea> : ''}
    </div>
  );
};

export default Edit;
