import { Box, TextField, Button } from '@skynexui/components'
import { useState } from 'react'
import theme from '../../styles/theme'
import { ButtonSendSticker } from '../ButtonSendSticker'
import { SaveNewMessage } from '../../utils/supabase'

export default function NewMessageBox({ username }) {
    const [newMessage, setNewMessage] = useState('')
    const [textAreaRows, setTextAreaRows] = useState(2)

    async function handleNewMessage(newMsg) {
        const msg = newMsg.trim()
        if (!msg) { return }

        const message = {
            de: username,
            texto: msg,
        }
        try {
            await SaveNewMessage(message)
            setNewMessage('')
        } catch (e) {
            console.error(e)
            window.alert(`Ocorreu um erro ao tentar salvar a mensagem: \n\n ${newMsg}`)
        }
    }

    return (
        <Box
            as="form"
            styleSheet={{
                display: 'flex',
                alignItems: 'center',
            }}
            onSubmit={() => console.log('submeteu')}
        >
            <ButtonSendSticker
                onStickerClick={(sticker) => {
                    handleNewMessage(':sticker: ' + sticker);
                }}
            />
            <TextField
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        if (e.shiftKey) {
                            if (textAreaRows < 7) {
                                setTextAreaRows(textAreaRows + 1)
                            }
                        }
                        else {
                            e.preventDefault()
                            handleNewMessage(newMessage)
                            setTextAreaRows(2)
                        }
                    }
                }}
                placeholder="Insira sua mensagem aqui..."
                type="textarea"
                rows={textAreaRows}
                styleSheet={{
                    width: '100%',
                    border: '0',
                    borderRadius: '5px',
                    backgroundColor: theme.colors.neutrals[800],
                    marginTop: '8px',
                    marginLeft: '8px',
                    marginRight: '16px',
                    color: theme.colors.neutrals[200],
                }}
            />
            <Button
                type='button'
                label='Enviar'
                onClick={() => handleNewMessage(newMessage)}
                buttonColors={{
                    contrastColor: theme.colors.neutrals["000"],
                    mainColor: theme.colors.primary[500],
                    mainColorLight: theme.colors.primary[400],
                    mainColorStrong: theme.colors.primary[600],
                }}
                styleSheet={{
                    minHeight: '48px',
                    minWidth: '48px',
                }}
            />
        </Box>
    )
}
