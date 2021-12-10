import React, { useState } from "react";
import "./upload.less";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const beforeUpload = (file: any) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const upload = (option: any) => {
  console.log(option);
};

const handleChange = (info: any) => {
  console.log(info);
};

const UploadCard: React.FC = () => {
  const [imageUrl] = useState("")
  const [loading] = useState(false)
  return (
    <div className="uploadIcon">
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={upload}
        beforeUpload={beforeUpload}
        onChange={handleChange}
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

export default UploadCard;
