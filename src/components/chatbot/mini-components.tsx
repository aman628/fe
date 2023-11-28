import { Chat, Close } from '@mui/icons-material'
import { Alert, Fab, Snackbar } from '@mui/material'
import React from 'react'

import chatbotIcon from '../../assets/icons/chatbotIcon.png'
import userIcon from '../../assets/icons/userIcon.png'
import style from './chatbot.module.css'

interface MainContainerIF {
  showChatBox: boolean
  children: JSX.Element[]
}
interface ChatboxIF {
  children: JSX.Element[]
}
// interface ChatSentIF {
//   text: string
//   failed: boolean
// }
// interface ChatReceivedIF {
//   text: string
//   buttons?: any[]
// }
interface NotificationBarIF {
  open: boolean
  handleClose: any
}
interface FabButtonIF {
  show: boolean
  update: any
}

const MainContainer = (props: MainContainerIF) => {
  const { showChatBox, children } = props
  return (
    <div className={style.container}>
      {showChatBox && children[0]}
      {children[1]}
    </div>
  )
}
const Chatbox = (props: ChatboxIF) => {
  const { children } = props
  return <div className={style.chatBoxContainer}>{children}</div>
}

const SentChat = (props: any) => {
  const { data } = props
  return (
    <div className={style.chatContainerSent}>
      <div
        className={`${style.chatTextSent} ${
          data.failed && style.chatContainerSentError
        }`}>
        {data.text}
      </div>
      <div className={`${style.iconImageBox} ${data.failed && style.iconImageBoxError}`}>
        <img alt="img" src={userIcon} style={{ height: '30px' }} />
      </div>
    </div>
  )
}
const ReceivedChat = (props: any) => {
  const { data, clickHandler } = props

  return (
    <div className={style.chatContainerReceived}>
      <div className={style.iconImageBox}>
        <img alt="img" src={chatbotIcon} style={{ height: '26px' }} />
      </div>
      <div>
        <div className={style.chatTextReceived}>
          <div>{data.text} </div>
          {data.buttons && (
            <div>
              {data.buttons.map((item: any, i: number) => (
                <button onClick={() => clickHandler(item)} key={i} type="button">
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
const NotificationBar = (props: NotificationBarIF) => {
  const { open, handleClose } = props
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <Alert variant="filled" onClose={handleClose} severity="error">
        Something went wrong!, Try again later
      </Alert>
    </Snackbar>
  )
}
const FabButton = (props: FabButtonIF) => {
  const { show, update } = props
  return (
    <div className={style.iconBox}>
      <Fab onClick={() => update(!show)} color="primary" aria-label="add">
        {show ? <Close /> : <Chat />}
      </Fab>
    </div>
  )
}
export { Chatbox, FabButton, MainContainer, NotificationBar, ReceivedChat, SentChat }
