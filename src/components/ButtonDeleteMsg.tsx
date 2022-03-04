/* eslint-disable @next/next/no-img-element */
import theme from '../styles/theme'

export default function ButtonDeleteMsg({ handleDeleteMessage, msg }) {
  return (<>
    <button
      className='ButtonDeleteMsg'
      onClick={(e) => {
        e.preventDefault()
        handleDeleteMessage(msg)
      }}
      aria-label={'Apagar mensagem'}
    >
      <img alt='Apagar mensagem' src='/icons/trash.svg' />
    </button>
    <style jsx>{`
      .ButtonDeleteMsg {
        background-color: transparent;
        margin-right: 8px;
        padding: 13px;
        cursor: pointer;
        border-radius: 5px;
        border: 0;
      }
      .ButtonDeleteMsg:hover {
        background-color: ${theme.colors.primary[900]};
      }
      .ButtonDeleteMsg:focus {
        background-color: ${theme.colors.primary[900]};
      }
    `}</style>
  </>)
}