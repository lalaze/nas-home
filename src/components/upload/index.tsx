import React, { useState, forwardRef, useImperativeHandle, useRef } from "react";
import './upload.less';
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import CropperArea from '../cropper/index'

const beforeUpload = (file: any) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const UploadCard = (props: any, ref: any) => {
  const { setImg } = props

  const [imageUrl] = useState("")

  const [loading] = useState(false)

  const [file, setFile] = useState('')

  const test = useRef<HTMLImageElement>(null)

  useImperativeHandle(ref, () => ({
    test
  }));
  
  const upload = (option: any) => {
    const reader = new FileReader()
    reader.onload = (evt: any) => {
      setFile(evt.target?.result)
    }
    reader.readAsDataURL(option.file)
  }
  return (
    <div className="uploadIcon">
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={upload}
        beforeUpload={beforeUpload}
        ref={test}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
          </div>
        )}
      </Upload>
      <div className="text">上传图片</div>
      {file ? <CropperArea file={file}  setImg={setImg} setFile={setFile}></CropperArea> : ''}
    </div>
  );
};

export default forwardRef(UploadCard)
