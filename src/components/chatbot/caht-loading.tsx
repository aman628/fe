import React from 'react'

import chatbotIcon from '../../assets/icons/chatbotIcon.png'
import style from './chatbot.module.css'

const ChatLoading = () => {
  return (
    <div className={style.chatContainerReceived}>
      <div className={style.iconImageBox}>
        <img alt="img" src={chatbotIcon} style={{ height: '25px', marginTop: '2px' }} />
      </div>
      <div className={style.chatTextReceived}>
        <span className={style.jumpingDots}>
          <span className={style.dot1} />
          <span className={style.dot2} />
          <span className={style.dot3} />
        </span>
      </div>
    </div>
  )
}
export default ChatLoading
