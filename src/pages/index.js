import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import { useRouter } from 'next/router'
import { PageSubtitle } from '../components/Head'
import theme from '../styles/theme'
import useVerifyUser from '../hooks/useVerifyUser'

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
                margin-top: 0;
            }
            `}</style>
    </>
  );
}

export default function Home() {
  const router = useRouter()
  const {
    entryUsername,
    setEntryUsername,
    username, name, userImgURL,
    status
  } = useVerifyUser()

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
          gap: '24px',
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
            if (status == 'debounced' && username) router.push(`/servers?username=${username}`)
          }}
          styleSheet={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
            width: { xs: '100%', sm: '50%' }, textAlign: 'center', minHeight: '240px'
          }}
        >
          <Title tag="h2">Seja bem vindo(a) aos</Title>
          <Text variant="body3" styleSheet={{ marginBottom: '32px', color: theme.colors.neutrals[300] }}>
            Servidores da {process.env.NEXT_PUBLIC_APP_NAME}
          </Text>

          <TextField
            value={entryUsername}
            placeholder="Entre com seu usuário do GitHub"
            onChange={(e) => setEntryUsername(e.target.value)}
            fullWidth
            styleSheet={{
              height: '48px',
              marginBottom: '16px'
            }}
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
            disabled={username == '' || status != 'debounced'}
            fullWidth
            styleSheet={{
              height: '48px'
            }}
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
              width: '166px'
            }}
            alt={name}
            src={userImgURL}
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
            {(status == 'debouncing' || status == 'running') ? 'Buscando usuário...' : name}
          </Text>
        </Box>
        {/* Photo Area */}
      </Box>
    </>
  )
}
