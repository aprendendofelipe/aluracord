import React from 'react';
import { Box, Button, Text, Image } from '@skynexui/components';
import appConfig from '../../config.json';
import theme from '../styles/theme'

export function ButtonSendSticker(props) {
  const [isOpen, setOpenState] = React.useState('');

  return (
    <Box
      styleSheet={{
        position: 'relative',
      }}
    >
      <Button
        styleSheet={{
          borderRadius: '50%',
          border: '0',
          padding: '7px',
          Width: '48px',
          Height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          filter: isOpen ? 'grayscale(0)' : 'grayscale(1)',
          hover: {
            filter: 'grayscale(0)',
          }
        }}
        label={
          <Text
            styleSheet={{
              fontSize: '28px',
            }}
          >
            😋
          </Text>}
        onClick={() => setOpenState(!isOpen)}
      />
      {isOpen && (
        <Box
          styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '5px',
            position: 'absolute',
            backgroundColor: theme.colors.neutrals[800],
            width: '60vw',
            height: '60vh',
            left: '8px',
            bottom: '36px',
            padding: '8px',
            boxShadow: 'rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px',
          }}
          onClick={() => setOpenState(false)}
        >
          <Box
            styleSheet={{
              padding: '8px',
              justifyContent: 'space-between'
            }}
          >
            <Text
              styleSheet={{
                color: theme.colors.neutrals["000"],
                fontWeight: 'bold',
              }}
            >
              Stickers
            </Text>
          </Box>
          <Box
            tag="ul"
            styleSheet={{
              display: 'flex',
              margin: '0',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              flex: 1,
              overflow: 'scroll',
              paddingInlineStart: '0px',
            }}
          >
            {appConfig.stickers.map((sticker) => (
              <Text
                onClick={() => {
                  if (Boolean(props.onStickerClick)) {
                    props.onStickerClick(sticker);
                  }
                }}
                tag="li" key={sticker}
                styleSheet={{
                  width: '160px',
                  maxWidth: '50%',
                  maxHeight: '160px',
                  borderRadius: '5px',
                  padding: '10px',
                  focus: {
                    backgroundColor: theme.colors.neutrals[600],
                  },
                  hover: {
                    backgroundColor: theme.colors.neutrals[600],
                  }
                }}
              >
                <Image src={sticker} alt={sticker} />
              </Text>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}