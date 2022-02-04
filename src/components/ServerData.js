import theme from '../styles/theme'

export default function ServerData(props) {
  return (
    <div className='ServerDataBox'
      style={{
        blackgroundImage: `url(${props.iframeSrv.imgSrc})`
      }}

    >
      <a
        href={props.iframeSrv.autoUser ? props.iframeSrv.url + props.username : props.iframeSrv.url}
        target="_blank"
        rel="noreferrer"
      >
        Conectado ao servidor externo:{" "}
        {props.iframeSrv.name}
      </a>
      <style jsx>{`
        .ServerDataBox {
          display: flex;
          color: ${theme.colors.neutrals[400]};
          background-color: ${theme.colors.neutrals[700]};
          max-width: calc(100vw - 12px);
          padding: 6px;
          align-items: center;
          justify-content: center;
        }
        @media screen and (min-width: 640px) {
            .ServerDataBox {
              padding: 12px;
              max-width: calc(100vw - 32px);
            }
          }
      `}</style>
    </div>
  )
}