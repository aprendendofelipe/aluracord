import { Text, Button } from '@skynexui/components'
import HeaderBox from './HeaderBox'

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
            label='Logout'
            href="/"
          />
        </HeaderBox>
      </>
    )
}

export default Header