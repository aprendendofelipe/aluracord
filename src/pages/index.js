import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { PageSubtitle } from '../components/Head'
import theme from '../styles/theme'


function Title(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
            ${Tag} {
                color: ${theme.colors.neutrals['000']};
                font-size: 24px;
                font-weight: 600;
            }
            `}</style>
    </>
  );
}

export default function Home() {
  const [username, setUsername] = useState('')
  const router = useRouter()

  return (
    <>
      <PageSubtitle>
        Login
      </PageSubtitle>
      <Box
        styleSheet={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          width: '100%', maxWidth: '700px',
          borderRadius: '5px', padding: '32px', margin: '16px',
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          backgroundColor: theme.colors.neutrals[700],
        }}
      >
        {/* Formulário */}
        <Box
          as="form"
          onSubmit={function (e) {
            e.preventDefault()
            if (username) {
              router.push(`/servers?username=${username}`)
            }
          }}
          styleSheet={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
          }}
        >
          <Title tag="h2">Seja bem vindo(a) aos</Title>
          <Text variant="body3" styleSheet={{ marginBottom: '32px', color: theme.colors.neutrals[300] }}>
            Servidores da {process.env.NEXT_PUBLIC_APP_NAME}
          </Text>

          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            textFieldColors={{
              neutral: {
                textColor: theme.colors.neutrals[200],
                mainColor: theme.colors.neutrals[900],
                mainColorHighlight: theme.colors.primary[500],
                backgroundColor: theme.colors.neutrals[800],
              },
            }}
          />
          <Button
            type='submit'
            label='Entrar'
            fullWidth
            buttonColors={{
              contrastColor: theme.colors.neutrals["000"],
              mainColor: theme.colors.primary[500],
              mainColorLight: theme.colors.primary[400],
              mainColorStrong: theme.colors.primary[600],
            }}
          />
        </Box>
        {/* Formulário */}


        {/* Photo Area */}
        <Box
          styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '200px',
            padding: '16px',
            backgroundColor: theme.colors.neutrals[800],
            border: '1px solid',
            borderColor: theme.colors.neutrals[999],
            borderRadius: '10px',
            flex: 1,
            minHeight: '240px',
          }}
        >

          <Image
            styleSheet={{
              borderRadius: '50%',
              marginBottom: '16px',
            }}
            alt={username}
            src={username ? `https://github.com/${username}.png` : "/github_sunglasses.svg"}
          />
          <Text
            variant="body4"
            styleSheet={{
              color: theme.colors.neutrals[200],
              backgroundColor: theme.colors.neutrals[900],
              padding: '3px 10px',
              borderRadius: '1000px'
            }}
          >
            {username}
          </Text>
        </Box>
        {/* Photo Area */}
      </Box>
    </>
  );
}
