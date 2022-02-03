import theme from '../styles/theme'

function ChatBox(props) {
    return (
      <div className='ChatBox'>
        {props.children}
        <style jsx>{`
          .ChatBox {
            display: flex;
            flex-direction: column;
            flex: 1;
            box-shadow: 0 2px 10px 0 rgb(0 0 0 / 20%);
            border-radius: 5px;
            background-color: ${theme.colors.neutrals[700]};
            height: calc(100vh - 98px);
            width: 800px;
            max-width: calc(100vw - 12px);
            max-height: calc(100vh - 90px);
            padding: 12px;
          }
          @media screen and (min-width: 640px) {
            .ChatBox {
              padding: 24px;
              max-width: calc(100vw - 120px);
              max-height: calc(100vh - 32px);
            }
          }
      `}</style>
    </div>
  )
}

export default ChatBox