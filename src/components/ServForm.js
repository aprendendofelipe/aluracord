import { Box, Text, TextField, Image, Button } from '@skynexui/components'
import { useEffect, useState } from 'react'
import theme from '../styles/theme'
import { createClient } from '@supabase/supabase-js'
import { ButtonSendSticker } from '../../src/components/ButtonSendSticker'
import styled from 'styled-components'


const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagensEmTempoReal(adicionaMensagem) {
  return supabaseClient
    .from('messages')
    .on('INSERT', (respostaLive) => {
      adicionaMensagem(respostaLive.new);
    })
    .subscribe();
}

function convertMessage(msg) { 
  return {
    from: msg.de,
    text: msg.texto,
    id: msg.id,
    created_at: msg.created_at
  }
}

function convertMessages(data) {
  let msgs = []
  if (data.length > 1) {
    msgs = data.map(msg => convertMessage(msg))
  }
  return msgs
}

export default function ChatPage(props) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    supabaseClient
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        const msgs = convertMessages(data)
        setMessages(msgs);
      });

    const subscription = escutaMensagensEmTempoReal((message) => {
      const msg = convertMessage(message)
      setMessages((valorAtualDaLista) => {
        return [
          msg,
          ...valorAtualDaLista,
        ]
      });
    });

    return () => {
      subscription.unsubscribe();
    }
  }, []);

  async function handleNewMessage(newMessage) {
    if (!newMessage) {return}
    const message = {
      de: props.username,
      texto: newMessage,
    }
    await supabaseClient
    .from('messages')
    .insert([
      message
    ])
    setMessage('')
  }

  function handleDeleteMessage(msgToDelete) {
    if (props.username == msgToDelete.from & window.confirm(`Tem certeza de que deseja apagar a mensagem abaixo? \n \n ${msgToDelete.text}`)) {
      try {
        supabaseClient
          .from('messages')
          .delete()
          .match({ id: msgToDelete.id })
          .then(({ data }) => {
            setMessages((messages)=>messages.filter(msg => msgToDelete.id != msg.id))
          })
      } catch (e) {
        console.error(e)
        window.alert(`Ocorreu um erro ao tentar apagar a mensagem: \n\n ${msgToDelete.text}`)
      }
    }
  };

  return (
    <ChatBox>
      <Header />
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
          boxShadow: `inset 0 2px 6px green`,
        }}
      >
        <Messages
          messages={messages}
          username={props.username}
          handleDeleteMessage={handleDeleteMessage}
        />
        <Box
          as="form"
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleNewMessage(message)
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
            onClick={()=>handleNewMessage(message)}
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

function Header() {
  return (
    <>
      <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
        <Text variant='heading5'>
          Discórdia
        </Text>
        <Button
          variant='tertiary'
          colorVariant='neutral'
          label='Logout'
          href="/"
        />
      </Box>
    </>
  )
}

function Messages(props) {
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: theme.colors.neutrals["000"],
        marginBottom: '16px',
        paddingInlineStart: '0px',
      }}
    >{props.messages.length > 0 && props.messages.map((msg) => {
      return (
        <Text
          key={msg.id}
          tag="li"
          styleSheet={{
            borderRadius: '5px',
            padding: '6px',
            marginBottom: '12px',
            hover: {
              backgroundColor: theme.colors.neutrals[700],
            }
          }}
        >
        <Box
          styleSheet={{
            marginBottom: '8px',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              flex: '1',
            }}
          >
            <Box>
              <Image
                styleSheet={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px',
                }}
                alt={msg.from}
                src={`https://github.com/${msg.from}.png`}
              />
              <Text tag="strong">
                {msg.from}
              </Text>
              <Text
                styleSheet={{
                  fontSize: '10px',
                  marginLeft: '8px',
                  color: theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {(new Date(msg.created_at).toLocaleString()).slice(0,-3)}
                  </Text>
                  </Box>
              {props.username == msg.from && <Box
                onClick={(e) => {
                  e.preventDefault()
                  props.handleDeleteMessage(msg)
                }}
                title={`Apagar mensagem`}
                styleSheet={{
                  padding: '2px',
                  cursor: 'pointer',
                }}
              >
                ✖️
              </Box>}
            </Box>
          </Box>
          {/* {msg.text} */}
          {msg.text.startsWith(':sticker:')
              ? (
              <Image
                src={msg.text.replace(':sticker: ', '')}
                alt={msg.from}
                styleSheet={{
                  maxWidth: '160px',
                  maxHeight: '160px'
                }}
              />
              )
              : (
                msg.text
              )}
        </Text>)
    })}
    </Box>
  )
}

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 20%);
  border-radius: 5px;
  background-color: ${theme.colors.neutrals[700]};
  height: 100%;
  max-width: calc(100vw - 32px);
  max-height: calc(100vh - 108px);
  padding: 24px;
  @media(min-width: 640px) {
    max-width: calc(100vw - 120px);
    max-height: calc(100vh - 44px);
  }
`