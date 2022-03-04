import { Box } from '@skynexui/components'
import theme from '../../styles/theme'
import Message from './Message'

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
        >
            {(props.messages?.length > 0) &&
                props.messages.map((msg) => <Message key={msg.id} message={msg} username={props.username} handleDeleteMessage={props.handleDeleteMessage} />)}
        </Box >
    )
}

export default Messages