import { Box } from '@skynexui/components'
import theme from '../styles/theme'
import { DeleteMessage } from '../utils/supabase'
import Messages from './messages/Messages'
import Header from './Header'
import ChatBox from './ChatBox'
import NewMessageBox from './messages/NewMessage'

export default function ChatPage(props) {

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
          backgroundColor: theme.colors.primary[900],
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
        <NewMessageBox username={props.username} />
      </Box>
    </ChatBox>
  )
}
