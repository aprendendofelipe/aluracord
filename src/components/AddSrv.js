/* eslint-disable @next/next/no-img-element */
import { Box, TextField, Button, Image } from '@skynexui/components'
import theme from '../styles/theme'
import { useState } from 'react'
import Header from './Header'
import { SaveNewServer } from '../utils/supabase'
import useDebounce from '../hooks/useAdaptiveDebounce'

const MAXLENGTH = 40

export default function AddSrvPage() {
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [autoUser, setAutoUser] = useState(false)
  const {
    entry: entryImgSrc,
    setEntry: setImgSrc,
    debounced: imgSrc,
    status
  } = useDebounce({
    defaultEntry: "",
    defaultReturn: "",
  })

  async function handleAddServer() {
    if (name && url && imgSrc && name.length <= MAXLENGTH) {
      const server = {
        name,
        url,
        imgSrc,
        autoUser
      }
      await SaveNewServer(server)
      alert('Dados do servidor enviados para revisão')
      setImgSrc('')
      setName('')
      setUrl('')
      setAutoUser(false)
    } else {
      alert('Dados do servidor incorretos')
    }
  }

  return (
    <div className='AddSrvBox'>
      <Header>Adicione servidores a essa Discórdia!</Header>
      <Box
        styleSheet={{
          position: 'relative',
          display: 'flex',
          flex: 1,
          color: theme.colors.neutrals[300],
          backgroundColor: theme.colors.neutrals[600],
          flexDirection: 'column',
          borderRadius: '5px',
          padding: '24px',
          boxShadow: `inset 0 2px 6px ${theme.colors.primary[400]}`,
          alignItems: 'center',
          maxHeight: '100%',
          overflow: 'auto',
        }}
      >
        <h2>
          Informe os dados do seu servidor
        </h2>
        <Box
          as="form"
          styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <TextField
            label={'Nome do servidor:'}
            maxLength={MAXLENGTH}
            counter={true}
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, MAXLENGTH))}
            placeholder='Aparecerá no rodapé ao acessar o seu servidor'
            type="textarea"
            styleSheet={textfield}
            textFieldColors={textFieldColors}
          />
          <TextField
            label={'URL (se for o caso, inclua /chat?username= no final):'}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://discordia-gamma.vercel.app/chat?username="
            type="textarea"
            styleSheet={textfield}
            textFieldColors={textFieldColors}
          />
          <TextField
            label={'Marque se seu servidor identifica qual é o usuário via useRouter().query'}
            checked={autoUser}
            onChange={(e) => setAutoUser(e.target.checked)}
            type="checkbox"
            styleSheet={{
              ...textfield,
              width: '100%',
              height: '18px',
            }}
            textFieldColors={textFieldColors}
          />
          <div className='imgSrvBox'>
            <TextField
              label={'URL da imagem (irá aparecer na lista de servidores):'}
              value={entryImgSrc}
              onChange={(e) => setImgSrc(e.target.value)}
              placeholder="https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg"
              type="textarea"
              styleSheet={textfield}
              textFieldColors={textFieldColors}
            />
            <div className='imgSrvMaskExt'>
              <div className='imgSrvMaskInt'>
                {imgSrc && <img
                  className='imgSrv'
                  src={imgSrc}
                  alt={'Insira uma imagem válida'}
                />}
              </div>
            </div>
          </div>
          <Button
            type='button'
            label='Salvar dados do Servidor'
            onClick={() => handleAddServer()}
            buttonColors={{
              contrastColor: theme.colors.neutrals["000"],
              mainColor: theme.colors.primary[500],
              mainColorLight: theme.colors.primary[400],
              mainColorStrong: theme.colors.primary[600],
            }}
            styleSheet={{
              height: '34px',
              marginBottom: '8px',
              alignSelf: 'center',
            }}
          />
        </Box>
        <Image
          src={theme.images.underConstruction}
          alt={'Página em construção'}
          styleSheet={{
            width: '280px',
            maxWidth: '80%',
            height: '100%',
            maxHeight: '160px',
            borderRadius: '5px',
            padding: '10px',
            paddingTop: '20px',
          }}
        />
      </Box>
      <style jsx>{`
        .AddSrvBox {
          display: flex;
          flex-direction: column;
          flex: 1;
          border-radius: 5px;
          background-color: ${theme.colors.neutrals[700]};
          height: 100%;
          max-height: 100%;
          width: 100%;
          padding: 12px;
          align-items: center;
          justify-content: center;
          overflow: auto;
        }
        h2 {
          font-size: 20px;
        }
        .imgSrvBox {
          display: flex;
          width: 100%;
        }
        .imgSrvMaskExt {
          display: flex;
          height: 56px;
          width: 56px;
          border-radius: 50%;
          align-self: center;
          margin-bottom: 16px;
          background-color: ${theme.colors.primary[200]}
        }
        .imgSrvMaskInt {
          display: flex;
          height: 48px;
          width: 48px;
          border-radius: 50%;
          margin: 4px;
          align-self: center;
          overflow: hidden;
          align-items: center;
          justify-content: center;
        }
        .imgSrv {
          height: 100%;
        }
        @media(min-width: 640px) {
          .AddSrvBox {
            padding: 24px;
            max-width: calc(100vw - 120px);
            max-height: calc(100vh - 32px);
          }
        }
        `}</style>
    </div>
  )
}

const textfield = {
  width: '100%',
  border: '0',
  resize: 'none',
  borderRadius: '5px',
  padding: '6px 8px',
  backgroundColor: theme.colors.neutrals[800],
  height: '50px',
  marginRight: '12px',
  marginBottom: '16px',
  color: theme.colors.neutrals[200],
}

const textFieldColors = {
  neutral: {
    textColor: theme.colors.neutrals[300],
  }
}