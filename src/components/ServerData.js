import theme from '../styles/theme'
import styled from 'styled-components'

export default function ServerData(props) {
  return (
    <ServerBox
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
    </ServerBox>
  )
}

const ServerBox = styled.div`
  display: flex;
  color: ${theme.colors.neutrals[400]};
  background-color: ${theme.colors.neutrals[700]};
  max-width: calc(100vw - 12px);
  padding: 6px;
  align-items: center;
  justify-content: center;
  @media(min-width: 640px) {
    padding: 12px;
    max-width: calc(100vw - 32px);
  }
`