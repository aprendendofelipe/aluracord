import { Text, Button } from '@skynexui/components'
import HeaderBox from './HeaderBox'
import theme from '../styles/theme'

function Header(props) {
  return (
    <>
      <HeaderBox>
        <Text variant='heading5'>
          {props.children}
        </Text>
        <Button
          variant='tertiary'
          colorVariant='neutral'
          label={<Text
            styleSheet={{
              color: theme.colors.neutrals[300],
            }}
          >
            Logout
          </Text>}
          href="/"
        />
      </HeaderBox>
    </>
  )
}

export default Header