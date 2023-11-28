import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './main.css'

import React from 'react'
import { render } from 'react-dom'

import style from './App.module.css'
import Chatbot from './components/chatbot'

function App() {
  return (
    <div className={style.container}>
      <Chatbot />
    </div>
  )
}
// console.log(import.meta.env.VITE_API_URL)

const rootElement = document.getElementById('root')
render(<App />, rootElement)
