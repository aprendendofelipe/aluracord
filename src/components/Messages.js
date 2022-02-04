import { Box, Text, Image } from '@skynexui/components'
import theme from '../styles/theme'
import { marked } from 'marked'
import DOMPurify from 'isomorphic-dompurify'

const renderer = new marked.Renderer()
const linkRenderer = renderer.link
renderer.link = (href, title, text) => {
  const html = linkRenderer.call(renderer, href, title, text)
  return html.replace(/^<a /, `<a target="_blank" rel="noreferrer noopener nofollow" `)
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
            const markdown = marked.parse(msg.text, {renderer: renderer})
            const sanitized = DOMPurify.sanitize(markdown, { ADD_ATTR: ['target'] })
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
                    alt={'De:'}
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
                    🗑️
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
                    : (<Box
                            styleSheet={{
                                wordWrap: 'break-word',
                            }}
                        dangerouslySetInnerHTML={{
                        __html: sanitized,
                    }}
                    />
                    )}
            </Text>)
        })}
        </Box>
    )
}

export default Messages