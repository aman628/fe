import React from 'react'

import ChatLoading from './caht-loading'
import style from './chatbot.module.css'
import { ReceivedChat, SentChat } from './mini-components'

interface ChatListIF {
  type: string
  text: string
  failed: boolean
  buttons?: any[]
}

interface ChatBoxBodyIF {
  chatList: ChatListIF[]
  loading: boolean
  clickHandler: any
}

const ChatBoxBody = (props: ChatBoxBodyIF) => {
  const { chatList, loading, clickHandler } = props
  return (
    <div className={style.chatBoxBodyContainer}>
      <div className={style.chatBoxBody}>
        {chatList.map((item, i) => {
          if (item.type === 'sent') {
            return <SentChat key={i} data={item} failed={item.failed} />
          }
          return <ReceivedChat key={i} data={item} clickHandler={clickHandler} />
        })}
        {loading && <ChatLoading />}
      </div>
    </div>
  )
}

export default ChatBoxBody
