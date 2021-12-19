import React, { useState } from "react";
import './upload.less';
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

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

const UploadCard: React.FC<{ setImg: any, setFile: any }> = (props: any) => {
  const { setFile } = props

  const [imageUrl] = useState("")

  const [loading] = useState(false)

  // const [file, setFile] = useState('')
  
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
    </div>
  );
};

export default UploadCard
