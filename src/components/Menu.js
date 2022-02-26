/* eslint-disable @next/next/no-img-element */
import theme from '../styles/theme'

function Menu(props) {
  return (
    <div className='Menu'>
      <ul className='optionsUl'>
        <li>
          <button
            aria-label={props.username}
            className='srvButton'
            onClick={() => {
              props.setScreen('main')
              props.setIframeSrv({})
            }}
          >
            <div className='maskImgSrv'>
              <img
                src={props.username ? `https://github.com/${props.username}.png` : "/github_sunglasses.svg"}
                alt={props.username}
              />
            </div>
          </button>
        </li>
        <li>
          <button
            className='srvButton'
            aria-label="Adicionar servidor"
            onClick={() => {
              props.setScreen('add')
              props.setIframeSrv({})
            }}
          >
            <div
              className='maskImgSrv'
              style={{ backgroundColor: theme.colors.neutrals[200] }}
            >
              <svg
                aria-hidden="false"
                width={36}
                height={36}
                viewBox="0 0 24 24"
              >
                <path
                  fill={theme.colors.primary[500]}
                  d="M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z">
                </path>
              </svg>
            </div>
          </button>
        </li>
      </ul>
      <ul className='srvMenuUl'>
        <li key={"a"}>
          <button
            aria-label="Servidor principal"
            className='srvButton'
            onClick={() => {
              props.setScreen('main')
              props.setIframeSrv({})
            }}
          >
            <div className='maskImgSrv'>
              <img
                src={theme.images.srvLink}
                alt="main chat"
              />
            </div>
            {props.screen == 'main' && <div className='selector'></div>}
          </button>
        </li>
        {props.servers?.map((server) => {
          return (
            <li key={server.url}>
              <button
                aria-label={server.name}
                className='srvButton'
                onClick={() => {
                  props.setIframeSrv(server)
                  props.setScreen('chat')
                }}
              >
                <div className='maskImgSrv'>
                  <img
                    src={server.imgSrc}
                    alt={server.name}
                  />
                </div>
                {(server.url == props.iframeSrv.url)
                  && <div className='selector' />}
              </button>
            </li>
          )
        })}
      </ul>

      <style jsx>{`
          .Menu {
            background-color: ${theme.colors.neutrals[700]};
            display: flex;
            height: 100%;
            width: 100%;
            padding-top: 6px;
            padding-left: 6px;
            border-radius: 5px;
            gap: 4px;
            transition: .3s;
          }
          .optionsUl {
            display: flex;
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
          .srvMenuUl {
            display: flex;
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
          .srvButton {
            cursor: pointer;
            background-color: transparent;
            border: 0;
            box-shadow: none;
            overflow: hidden;
            height: 56px;
            width: 59px;
            padding: 4px;
          }
  
          .srvButton:hover div {
            border-radius: 40%;
          }
          .maskImgSrv {
            display: flex;
            height: 48px;
            width: 48px;
            margin-left: 4px;
            border-radius: 50%;
            overflow: hidden;
            align-items: center;
            justify-content: center;
            align-self: center;
          }
          img {
            height: 100%;
            z-index: 2;
          }
  
          .selector {
            background-color: ${theme.colors.primary[200]};
            position: relative;
            border-radius: 50%;
            top: -52px;
            /* left: 2px; */
            height: 56px;
            width: 56px;
            z-index: 1;
          }
  
          @media screen and (max-width: 639px) {
            .Menu {
                flex-direction: row;
                width: calc(100vw - 12px);
            }
            .optionsUl {
                gap: 8px;
                overflow-x: auto;
                flex-direction: row;
                max-width: 50%;
                margin-top: -6px
            }
            .srvMenuUl {
                gap: 8px;
                overflow-x: auto;
                flex-direction: row;
                max-height: 100%;
                width: calc(100vw - 124px);
                padding: 10px;
            }
            .srvButton {
                display: contents;
            }
            .maskImgSrv {
            }
          }
          
          @media screen and (min-width: 640px) {
            .Menu {
                flex-direction: column;
                height: calc(100vh - 32px);
            }
            .optionsUl {
                gap: 4px;
                overflow-y: auto;
                flex-direction: column;
                max-height: 50%;
                padding-top: 8px;
            }
            .srvMenuUl {
                gap: 4px;
                overflow-y: auto;
                flex-direction: column;
                max-height: 100%;
                height: calc(100vh - 164px);
                padding-top: 8px;
                padding-bottom: 8px;
            }
          }  
      `}</style>
    </div>
  )
}

export default Menu