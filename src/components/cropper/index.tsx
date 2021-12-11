import React, { useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import './cropper.less'
import { Button } from "antd";

const CropperArea: React.FC<{file: String, setFile:Function, setImg: Function}> = (props: any) => {
  const cropperRef = useRef<HTMLImageElement>(null)

  const onCrop = () => {
    const imageElement: any = cropperRef?.current
    const cropper: any = imageElement?.cropper
    setPreview(cropper.getCroppedCanvas().toDataURL())
  };

  const {file, setFile, setImg} = props

  const [ preview, setPreview ] = useState('')

  const close = () => {
    setFile('')
  }

  const ok = () => {
    setImg(preview)
    setFile('')
  }

  return (
      <div className="mask" onClick={close}>
        <div className="show" onClick={(e) => {e.stopPropagation()}}>
            <div className="title">
                <div className="label">自定义图标</div>
                <div className="close" onClick={close}></div>
            </div>
            <div className="cropperArea">
                <Cropper
                src={file}
                style={{ height: 400, width: 400 }}
                initialAspectRatio={1 / 1}
                guides={false}
                crop={onCrop}
                ref={cropperRef}
                />
                <div className="right">
                    <div className="label">预览</div>
                    <div className="preview" style={{ backgroundImage: preview ? `url(${preview})` : ''}}></div>
                </div>   
            </div>
            <div className="corrperButtonList">
                <Button style={{width: '150px'}} onClick={close} className="submit" type="primary" size="large">取消</Button>
                <Button style={{width: '150px'}} onClick={ok} className="submit" type="primary" size="large">确定</Button>
            </div>
        </div>
    </div>
   
  );
};

export default CropperArea