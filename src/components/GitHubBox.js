import { Box, Text, Button } from '@skynexui/components'
import theme from '../styles/theme'
import styled from 'styled-components'
import HeaderBox from './HeaderBox'

export default function GitHubBox(props) {

  return (
    <AddSrvBox>
      <Header />
      <Box
        styleSheet={{
          position: 'relative',
          display: 'flex',
          flex: 1,
          backgroundColor: theme.colors.neutrals[600],
          flexDirection: 'column',
          borderRadius: '5px',
          padding: '24px',
          boxShadow: `inset 0 2px 6px ${theme.colors.primary[400]}`,
          alignItems: 'center',
        }}
      >
        <iframe
                height={'100%'}
                width={'100%'}
                frameBorder={0}
                allowFullScreen={false}
                src={'https://github.com/aprendendofelipe/aluracord'}
              />
      </Box>
    </AddSrvBox>
  )
}

function Header() {
  return (
    <>
      <HeaderBox>
        <Text variant='heading5'>
          Adicione servidores a essa Discórdia!
        </Text>
        <Button
          variant='tertiary'
          colorVariant='neutral'
          label='Logout'
          href="/"
        />
      </HeaderBox>
    </>
  )
}

const AddSrvBox = styled.div`
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
  @media(min-width: 640px) {
    padding: 24px;
    max-width: calc(100vw - 120px);
    max-height: calc(100vh - 32px);
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
`

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