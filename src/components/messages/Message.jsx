import { Box, Text, Image, Button } from '@skynexui/components'
import theme from '../../styles/theme'
import { marked } from 'marked'
import DOMPurify from 'isomorphic-dompurify'
import ButtonDeleteMsg from '../ButtonDeleteMsg'
import { useState } from 'react'

const renderer = new marked.Renderer()
const linkRenderer = renderer.link
renderer.link = (href, title, text) => {
    const html = linkRenderer.call(renderer, href, title, text)
    return html.replace(/^<a /, `<a target="_blank" rel="noreferrer noopener nofollow" `)
}

export default function Message({ message, username, handleDeleteMessage }) {
    const [isInTheBox, setIsInTheBox] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const markdown = marked.parse(message.text, { renderer: renderer })
    const sanitized = DOMPurify.sanitize(markdown, { ADD_ATTR: ['target'] })
    const ownMsg = username == message.from

    return (<>
        <Box
            key={message.id}
            tag="li"
            onMouseEnter={() => setIsInTheBox(true)}
            onMouseLeave={() => setIsInTheBox(false)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            styleSheet={{
                borderRadius: '5px',
                padding: '6px',
                maxWidth: '95%',
                marginBottom: '8px',
                alignSelf: ownMsg ? 'end' : 'start',
                backgroundColor: ownMsg ? theme.colors.primary[700] : theme.colors.neutrals[600],
                hover: {
                    backgroundColor: ownMsg ? theme.colors.primary[300] : theme.colors.neutrals[700],
                }
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    marginRight: '16px',
                    marginBottom: '8px',
                    justifyContent: 'space-between',
                }}
            >
                {ownMsg &&
                    ((isInTheBox || isFocused) ? <ButtonDeleteMsg handleDeleteMessage={handleDeleteMessage} msg={message} /> : <div style={{ width: '48px' }}></div>)}
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <a className='ProfileUserLink'
                        href={`https://alurakut-zeta-six.vercel.app/users/${message.from}`}
                        target="_blank" rel="noreferrer noopener nofollow"
                    >
                        <Image
                            styleSheet={{
                                width: '26px',
                                height: '26px',
                                borderRadius: '50%',
                                display: 'inline-block',
                                marginRight: '8px',
                            }}
                            alt={'De:'}
                            src={`https://github.com/${message.from}.png`}
                        />
                        <Text tag="strong">
                            {message.from}
                        </Text>
                        <Text
                            styleSheet={{
                                fontSize: '10px',
                                marginLeft: '8px',
                                color: theme.colors.neutrals[300],
                            }}
                            tag="span"
                        >
                            {(new Date(message.created_at).toLocaleString()).slice(0, -3)}
                        </Text>
                    </a>
                </Box>
            </Box>
            {message.text.startsWith(':sticker:')
                ? (
                    <Box
                        styleSheet={{
                            display: 'flex',
                            margin: '16px',
                            marginTop: '0',
                            justifyContent: ownMsg ? 'end' : 'start',
                            overflow: 'auto',
                        }}
                    >
                        <Image
                            src={message.text.replace(':sticker: ', '')}
                            alt={message.from}
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
        </Box>
        <style jsx>{`
                            .ProfileUserLink {
                                display: flex;
                                flex-wrap: wrap;
                                height: 48px;
                                margin-left: 12px;
                                align-items: center;
                                justify-content: ${ownMsg ? 'end' : 'start'};
                                border-radius: 5px;
                                padding: 4px;
                            }
                            .ProfileUserLink:hover {
                                background-color: ${theme.colors.primary[900]};
                            }
                            .ProfileUserLink:focus {
                                background-color: ${theme.colors.primary[900]};
                            }
                            `}
        </style>
    </>)
}
