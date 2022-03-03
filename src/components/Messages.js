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
            const ownMsg = props.username == msg.from
            return (
                <Box
                    key={msg.id}
                    tag="li"
                    styleSheet={{
                        borderRadius: '5px',
                        padding: '6px',
                        width: '90%',
                        alignSelf: ownMsg ? 'end' : 'start',
                        hover: {
                            backgroundColor: theme.colors.neutrals[700],
                        }
                    }}
                >
                    <Box
                        styleSheet={{
                            display: 'flex',
                            marginLeft: '16px',
                            marginBottom: '8px',
                            justifyContent: ownMsg ? 'end' : 'start',
                        }}
                    >
                        <Box
                            styleSheet={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <a
                                href={`https://alurakut-zeta-six.vercel.app/users/${msg.from}`}
                                target="_blank" rel="noreferrer noopener nofollow"
                            >
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    height: '48px',
                                    alignItems: 'center',
                                    justifyContent: ownMsg ? 'end' : 'start',
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
                                </div>
                            </a>
                            {ownMsg &&
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
                    {msg.text.startsWith(':sticker:')
                        ? (
                            <Box
                                styleSheet={{
                                    display: 'flex',
                                    margin: '16px',
                                    marginTop: '0',
                                    justifyContent: ownMsg ? 'end' : 'start',
                                }}
                            >
                                <Image
                                    src={msg.text.replace(':sticker: ', '')}
                                    alt={msg.from}
                                    styleSheet={{
                                        maxWidth: '160px',
                                        maxHeight: '160px'
                                    }}
                                />
                            </Box>
                        )
                        : (<Box
                            styleSheet={{
                                margin: '16px',
                                marginTop: '-16px',
                                marginBottom: '0',
                                wordWrap: 'break-word',
                                overflow: 'auto',
                                maxWidth: '100%',
                                textAlign: ownMsg ? 'right' : 'left'
                            }}
                            dangerouslySetInnerHTML={{
                                __html: sanitized,
                            }}
                        />
                        )
                    }
                </Box>)
        })}
        </Box >
    )
}

export default Messages