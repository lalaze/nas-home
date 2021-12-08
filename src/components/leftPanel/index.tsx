import React, { useState } from 'react'
import './leftPanel.less'

const LeftPanel: React.FC = () => {
  const [show, setShow] = useState(false)
  return (
    <div className="panelIcon" onClick={() => {
      setShow(true)
    }}></div>
  )
}

export default LeftPanel