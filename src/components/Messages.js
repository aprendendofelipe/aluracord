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
        >{props.messages?.length > 0 && props.messages.map((msg) => {
            const markdown = marked.parse(msg.text, { renderer: renderer })
            const sanitized = DOMPurify.sanitize(markdown, { ADD_ATTR: ['target'] })
            return (
                <Box
                    key={msg.id}
                    tag="li"
                    styleSheet={{
                        borderRadius: '5px',
                        padding: '6px',
                        // marginBottom: '4px',
                        marginLeft: props.username == msg.from ? '32px' : '0',
                        marginRight: props.username == msg.from ? '0' : '32px',
                        hover: {
                            backgroundColor: theme.colors.neutrals[700],
                        }
                    }}
                >
                    <Box
                        styleSheet={{
                            marginLeft: '16px',
                            marginBottom: '8px',
                        }}
                    >
                        <Box
                            styleSheet={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: props.username == msg.from ? 'end' : 'start',
                                alignItems: 'center',
                            }}
                        >
                            <a
                                href={`https://alurakut-zeta-six.vercel.app/users/${msg.from}`}
                                target="_blank" rel="noreferrer noopener nofollow"
                            >
                                <div style={{
                                    display: 'flex',
                                    height: '48px',
                                    alignItems: 'center',
                                }}>
                                    <Image
                                        styleSheet={{
                                            width: '26px',
                                            height: '26px',
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
                                </div>
                            </a>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date(msg.created_at).toLocaleString()).slice(0, -3)}
                            </Text>
                            {props.username == msg.from &&
                                <Box
                                    onClick={(e) => {
                                        e.preventDefault()
                                        props.handleDeleteMessage(msg)
                                    }}
                                    title={`Apagar mensagem`}
                                    styleSheet={{
                                        paddingTop: '16px',
                                        paddingLeft: '15px',
                                        paddingRight: '15px',
                                        paddingBottom: '10px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img alt='Apagar mensagem' src='/icons/trash.svg' />
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
                                    margin: '16px',
                                    marginTop: '12px',
                                    maxWidth: '160px',
                                    maxHeight: '160px'
                                }}
                            />
                        )
                        : (<Box
                            styleSheet={{
                                margin: '16px',
                                marginTop: '-16px',
                                marginBottom: '0',
                                wordWrap: 'break-word',
                                overflow: 'auto',
                                maxWidth: '100%',
                                textAlign: props.username == msg.from ? 'right' : 'left'
                            }}
                            dangerouslySetInnerHTML={{
                                __html: sanitized,
                            }}
                        />
                        )
                    }
                </Box>)
        })}
        </Box>
    )
}

export default Messages