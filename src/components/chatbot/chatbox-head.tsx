import React from 'react'

import msysLogo from '../../assets/icons/msysLogo.png'
import style from './chatbot.module.css'

const ChatBoxHead = () => {
  return (
    <div className={style.chatBoxHead}>
      <div className={style.iconImageBox}>
        <img alt="img" src={msysLogo} style={{ height: '30px' }} />
      </div>
      <div>MSys Chatbot</div>
    </div>
  )
}
export default ChatBoxHead
