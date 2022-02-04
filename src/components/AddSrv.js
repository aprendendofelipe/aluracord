/* eslint-disable @next/next/no-img-element */
import { Box, TextField, Button, Image } from '@skynexui/components'
import theme from '../styles/theme'
import { useState } from 'react'
import Header from './Header'
import { SaveNewServer } from '../utils/supabase'

export default function AddSrvPage(props) {
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [imgSrc, setImgSrc] = useState("")
  const [autoUser, setAutoUser] = useState(false)

  async function handleAddServer() {
    if (name && url && imgSrc) {
      const server = {
        name,
        url,
        imgSrc,
        autoUser
      }
      await SaveNewServer(server)
      alert('Dados do servidor enviados para revisão')
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
          <p>Nome que aparecerá no rodapé ao acessar o seu servidor:</p>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do servidor"
            type="textarea"
            styleSheet={textfield}
          />
          <p>URL (se for o caso, inclua <b>/chat?username=</b> no final):</p>
          <TextField
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://discordia-gamma.vercel.app/chat?username="
            type="textarea"
            styleSheet={textfield}
          />
          <p>URL da imagem (irá aparecer na lista de servidores):</p>
          <TextField
            value={imgSrc}
            onChange={(e) => setImgSrc(e.target.value)}
            placeholder="https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg"
            type="textarea"
            styleSheet={{ ...textfield, height: '50px' }}
          />
          <div className='imgSrv'>
            {imgSrc && <img
              src={imgSrc}
              alt={'Insira uma imagem válida'}
            />}
          </div>
          <p>Marque se seu sevidor identifica qual é o usuário via <b>useRouter.query</b>?</p>
          <TextField
            checked={autoUser}
            onChange={(e) => setAutoUser(e.target.checked)}
            type="checkbox"
            styleSheet={{
              width: '100%',
              height: '18px',
            }}
          />
          <Button
            type='button'
            label='Salvar Servidor'
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
            }}
          />
        </Box>
        <Image
          src={theme.images.underConstruction}
          alt={'Página em construção'}
          styleSheet={{
            width: '280px',
            maxWidth: '80%',
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
          color: ${theme.colors.primary[100]};
          background-color: ${theme.colors.neutrals[700]};
          height: 100%;
          width: 100%;
          padding: 12px;
          align-items: center;
          justify-content: center;
        }
        h2 {
          font-size: 20px;
        }
        p {
          padding-top: 10px;
          font-size: 14px;
        }
        button {
          align-self: flex-end;
        }
        .imgSrv {
          display: flex;
          height: 48px;
          width: 48px;
          border-radius: 50%;
          align-self: center;
          overflow: hidden;
          align-items: center;
          justify-content: center;
        }
        img {
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
  height: '34px',
  marginRight: '12px',
  color: theme.colors.neutrals[200],
}
