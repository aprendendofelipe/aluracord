import { Box, TextField, Button } from '@skynexui/components'
import { useState } from 'react'
import theme from '../styles/theme'
import { ButtonSendSticker } from './ButtonSendSticker'
import { DeleteMessage, SaveNewMessage } from '../utils/supabase'
import Messages from './Messages'
import Header from './Header'
import ChatBox from './ChatBox'

export default function ChatPage(props) {
  const [newMessage, setNewMessage] = useState('')

  async function handleNewMessage(newMsg) {
    const msg = newMsg.trim()
    if (!msg) { return }

    const message = {
      de: props.username,
      texto: msg,
    }
    try {
      await SaveNewMessage(message)
      setNewMessage('')
    } catch (e) {
      console.error(e)
      window.alert(`Ocorreu um erro ao tentar salvar a mensagem: \n\n ${newMsg}`)
    }
  }

  async function handleDeleteMessage(msgToDelete) {
    if (props.username == msgToDelete.from & window.confirm(`Tem certeza de que deseja apagar a mensagem abaixo? \n \n ${msgToDelete.text}`)) {
      try {
        const id = await DeleteMessage(msgToDelete)
        if (msgToDelete.id == id) {
          props.setMessages((messages) => messages.filter(msg => msg.id != id))
        } else {
          throw new error(`Ocorreu um erro ao tentar apagar a mensagem: \n\n ${msgToDelete.text}`)
        }

      } catch (e) {
        console.error(e)
        window.alert(`Ocorreu um erro ao tentar apagar a mensagem: \n\n ${msgToDelete.text}`)
      }
    }
  }

  return (
    <ChatBox>
      <Header>Discórdia - Servidor Principal</Header>
      <Box
        styleSheet={{
          position: 'relative',
          display: 'flex',
          flex: 1,
          height: '40%',
          backgroundColor: theme.colors.neutrals[600],
          flexDirection: 'column',
          borderRadius: '5px',
          padding: '16px',
          boxShadow: `inset 0 2px 6px ${theme.colors.primary[400]}`,
        }}
      >
        <Messages
          messages={props.messages}
          username={props.username}
          handleDeleteMessage={handleDeleteMessage}
        />
        <Box
          as="form"
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
          }}
          onSubmit={() => console.log('submeteu')}
        >
          <TextField
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleNewMessage(newMessage)
              }
            }}
            placeholder="Insira sua mensagem aqui..."
            type="textarea"
            styleSheet={{
              width: '100%',
              border: '0',
              resize: 'none',
              borderRadius: '5px',
              padding: '6px 8px',
              backgroundColor: theme.colors.neutrals[800],
              height: '34px',
              marginRight: '12px',
              color: theme.colors.neutrals[200],
            }}
          />
          <ButtonSendSticker
            onStickerClick={(sticker) => {
              handleNewMessage(':sticker: ' + sticker);
            }}
          />
          <Button
            type='button'
            label='Enviar'
            onClick={() => handleNewMessage(newMessage)}
            buttonColors={{
              contrastColor: theme.colors.neutrals["000"],
              mainColor: theme.colors.primary[500],
              mainColorLight: theme.colors.primary[400],
              mainColorStrong: theme.colors.primary[600],
            }}
            styleSheet={{
              height: '34px',
              marginBottom: '8px',
            }}
          />
        </Box>
      </Box>
    </ChatBox>
  )
}
