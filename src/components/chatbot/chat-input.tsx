import { Send } from '@mui/icons-material'
import { IconButton, TextField } from '@mui/material'
import React from 'react'

import style from './chatbot.module.css'

interface ChatInputIF {
  input: string
  setInput: any
  submit: any
}

const ChatInput = (props: ChatInputIF) => {
  const { input, setInput, submit } = props
  const handlePressEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      submit()
    }
  }

  return (
    <div className={style.inputContainer}>
      <TextField
        value={input}
        onChange={(e) => setInput(e.target.value)}
        variant="standard"
        name="input"
        fullWidth
        autoFocus
        placeholder="Type a message..."
        InputProps={{
          endAdornment: input ? (
            <IconButton onClick={submit}>
              <Send sx={{ color: 'grey', cursor: 'pointer' }} />
            </IconButton>
          ) : null,
          disableUnderline: true,
        }}
        onKeyDown={handlePressEnter}
      />
    </div>
  )
}

export default ChatInput
