import React, { useEffect, useState } from 'react'

import { getChatbotApiResponse } from '~/utils/api'

import ChatInput from './chat-input'
import ChatBoxBody from './chatbox-body'
import ChatBoxHead from './chatbox-head'
import { Chatbox, FabButton, MainContainer, NotificationBar } from './mini-components'

const Chatbot = () => {
  const [showChatBox, setShowChatBox] = useState(false)
  const [input, setInput] = useState('')
  const [chatList, setChatList] = useState<ChatIF[]>([])
  const [loading, setLoading] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [queryType, setQueryType] = useState('initial')
  const [disable, setDisable] = useState(false)

  console.log(queryType)

  useEffect(() => {
    setChatList([
      {
        type: 'received',
        text: 'Hello, welcome to the travel planner bot!',
        failed: false,
        buttons: ['Travel Plan', 'Restaurant Info'],
      },
    ])
  }, [])

  const getInternalResponse = async (query: string) => {
    if (queryType === 'Travel Plan') {
      setQueryType('12')
      return {
        type: 'received',
        text: 'Enter the travel destination(place)',
        failed: false,
      }
    }
    if (queryType === 'Restaurant Info') {
      setQueryType('22')
      return {
        type: 'received',
        text: 'Enter the location for restaurant information',
        failed: false,
      }
    }
    if (queryType === '12') {
      window.localStorage.setItem('11', query)
      setQueryType('13')
      return {
        type: 'received',
        text: 'Enter the state',
        failed: false,
      }
    }
    if (queryType === '13') {
      window.localStorage.setItem('12', query)
      setQueryType('14')
      return {
        type: 'received',
        text: 'Enter the number of days',
        failed: false,
      }
    }
    if (queryType === '14') {
      window.localStorage.setItem('13', query)
      setQueryType('15')
      return {
        type: 'received',
        text: 'Enter the season',
        failed: false,
      }
    }

    return {
      type: 'received',
      text: 'Thank You',
      failed: false,
    }
  }

  interface ChatIF {
    type: string
    text: string
    failed: boolean
    buttons?: any[]
  }

  const handleClose = () => {
    setShowSnackbar(false)
  }

  const handleSubmit = async (query: string) => {
    if (loading) return

    setLoading(true)
    setInput('')
    const sentObj = {
      type: 'sent',
      text: query,
      failed: false,
    }
    if (query !== 'initial') setChatList([...chatList, sentObj])

    try {
      let internalRes: any
      let chatbotRes
      let receivedObj

      if (queryType === '15') {
        const destination = localStorage.getItem('11')
        const state = localStorage.getItem('12')
        const days = localStorage.getItem('13')
        chatbotRes = await getChatbotApiResponse(
          `I want to travel to ${destination}, in the state of ${state}, for ${days} days in the ${query}`
        )
        receivedObj = {
          type: 'received',
          text: chatbotRes.response,
          failed: false,
        }
        localStorage.clear()
      } else if (queryType === '22') {
        chatbotRes = await getChatbotApiResponse(
          `I want restaurant information in ${query}`
        )
        receivedObj = {
          type: 'received',
          text: chatbotRes.response,
          failed: false,
        }
      } else {
        internalRes = await getInternalResponse(query)
        receivedObj = internalRes
      }

      if (query !== 'initial') {
        setChatList([...chatList, sentObj, receivedObj])
      } else {
        setChatList([...chatList, receivedObj])
      }
      setLoading(false)
    } catch (error: any) {
      const sentFailedObj = {
        type: 'sent',
        text: query,
        failed: true,
      }
      setChatList([...chatList, sentFailedObj])
      setShowSnackbar(true)
      setLoading(false)
    }
  }
  const handleFabButton = (event: boolean) => {
    setShowChatBox(event)
    setShowSnackbar(false)
    if (showChatBox) {
      setChatList([])
    } else {
      setChatList([
        {
          type: 'received',
          text: 'Hello, welcome to the travel planner bot!',
          failed: false,
          buttons: ['Travel Plan', 'Restaurant Info'],
        },
      ])
      setDisable(false)
    }
  }
  const clickHandler = (e: any) => {
    if (disable) return
    setQueryType(e)
    setDisable(!disable)
  }

  useEffect(() => {
    if (disable) handleSubmit(queryType)
  }, [disable])

  return (
    <MainContainer showChatBox={showChatBox}>
      <Chatbox>
        <ChatBoxHead />
        <ChatBoxBody chatList={chatList} loading={loading} clickHandler={clickHandler} />
        <ChatInput submit={() => handleSubmit(input)} input={input} setInput={setInput} />
        <NotificationBar open={showSnackbar} handleClose={handleClose} />
      </Chatbox>
      <FabButton show={showChatBox} update={handleFabButton} />
    </MainContainer>
  )
}

export default Chatbot
