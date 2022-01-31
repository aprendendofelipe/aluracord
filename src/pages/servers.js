/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import theme from '../styles/theme'
import Chat from '../components/chat'
import { PageSubtitle } from '../components/Head'
import { getServers, getMessages, ServersRealTime } from '../utils/supabase'
import { useWarnStars } from '../utils/starsquestion'
import ServerData from '../components/ServerData'


export default function ServersPage(props) {
  const router = useRouter()
  const username = router.query.username
  const [screen, setScreen] = useState('main')
  const [iframeSrv, setIframeSrv] = useState('')
  const [servers, setServers] = useState(() => props.servers)

  useWarnStars()

  useEffect(() => {
    if (router && !username) {
      router.replace(`/`)
    }
  },[router])

  useEffect(() => {
    const subscription = ServersRealTime((server) => {
      setServers((servers) => {
        return [
          server,
          ...servers,
        ]
      })
    })
    
    getServers(servers)
    .then((srvs)=> setServers(srvs))

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (<>
    <PageSubtitle>Servidores</PageSubtitle>
    <HomeScreen>  
      <SideBar>
        <SideMenu
          username={username}
          screen={screen}
          setScreen={setScreen}
          iframeSrv={iframeSrv}
          setIframeSrv={setIframeSrv}
          servers={servers}
        />
      </SideBar>  
      {screen === 'main'
        ? <Chat
          username={username}
          messages={props.messages}
        />
        : <ChatBox>
            <iframe
              height={'100%'}
              width={'100%'}
              frameBorder={0}
              allowFullScreen={false}
              src={iframeSrv.autoUser ? iframeSrv.url + username : iframeSrv.url}
            />
          <ServerData iframeSrv={iframeSrv} username={username} />
          </ChatBox>}
    </HomeScreen>
  </>)
}

function SideMenu(props) {
  const servers = props.servers

  return (
    <>
      <button onClick={() => {
        props.setScreen('main')
        props.setIframeSrv({})
      }} >
        <div>
          <img
            src={`https://github.com/${props.username}.png`}
            alt={props.username}
          />
        </div>
      </button>
      <button onClick={() => {
        props.setScreen('main')
        props.setIframeSrv({})
      }}>
        <div>
          <svg
            aria-hidden="false"
            width={36}
            height={36}
            viewBox="0 0 24 24">
            <path
              fill={theme.colors.primary[500]}
              d="M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z">
            </path>
          </svg>
        </div>
      </button>
      <ul>
      <li key={"a"}>
        <button onClick={() => {
            props.setScreen('main')
            props.setIframeSrv({})
          }}
        >
          <div>
            <img
              src="https://deltime.com.br/wp-content/uploads/2019/03/seguran%C3%A7a-de-datacenters-Deltime.jpg"
              alt="main chat"
            />
          </div>
          {props.screen == 'main' && <div className='mask'>
                    {/* {server.name} */}
                  </div>}
        </button>
      </li>
        {servers.map((server) => {
          return (
            <li key={server.url}>
              <button onClick={() => {
                props.setIframeSrv(server)
                props.setScreen('chat')
              }} >
                <div>
                  <img
                    src={server.imgSrc}
                    alt={server.name}
                  />
                </div>
                {(server.url == props.iframeSrv.url)
                  && <div className='mask' />}
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}


export async function getStaticProps() {
  let promises = []
  promises.push(getMessages().catch(() => []))
  promises.push(getServers().catch(() => []))

  const responses = await Promise.all(promises)
  .then((responses) => {
    return {
        props: {
          messages: responses[0],
          servers: responses[1]
        },
    }
  })
    
  return {
    ...responses,
    revalidate: 1
  }
}


const HomeScreen = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  @media(min-width: 640px) {
    padding: 16px;
    grid-gap: 16px;
    grid-template-columns: 78px 1fr;
  }
  @media(max-width: 639px) {
    padding: 6px;
    grid-gap: 6px;
    grid-template-rows: 78px 1fr;
  }
`

const SideBar = styled.div`
  background-color: ${theme.colors.neutrals[700]};
  display: flex;
  height: 78px;
  width: 100%;
  padding-top: 7px;
  padding-left: 7px;
  border-radius: 5px;
  gap: 4px;
  transition: .3s;
  @media(min-width: 640px) {
    flex-direction: column;
    height: calc(100vh - 32px);
  }
  @media(max-width: 639px) {
    flex-direction: row;
    width: calc(100vw - 12px);
  }
  ul {
    display: flex;
    margin: 0;
    padding: 0;
    overflow: hidden;
    @media(min-width: 640px) {
      gap: 4px;
      overflow-y: auto;
      flex-direction: column;
      max-height: 100%;
      height: calc(100vh - 164px);
      padding-top: 8px;
      padding-bottom: 8px;
    }
    @media(max-width: 639px) {
      gap: 8px;
      overflow-x: auto;
      flex-direction: row;
      max-height: 100%;
      width: calc(100vw - 144px);
      padding-left: 8px;
      padding-right: 8px;
    }
  }

  button {
    cursor: pointer;
    background-color: transparent;
    border: 0;
    box-shadow: none;
    height: 56px;
    width: 56px;
    padding: 0;
    align-items: center;
    justify-content: center;
    @media(max-width: 639px) {
      display: contents;
    }

    :hover div {
      border-radius: 40%;
    }

    div {
      display: flex;
      background-color: ${theme.colors.neutrals[200]};
      height: 48px;
      width: 48px;
      margin-left: 6px;
      border-radius: 50%;
      overflow: hidden;
      align-items: center;
      justify-content: center;
      @media(max-width: 639px) {
        margin-left: 0px;
        margin-top: 6px;
      }
      
      img {
        height: 100%;
        z-index: 1;
      }
    }
    .mask {
      background-color: ${theme.colors.primary[200]};
      position: relative;
      top: -52px;
      left: -4px;
      height: 56px;
      width: 56px;
      z-index: 0;
      @media(max-width: 639px) {
        top: -58px;
        left: -4px;
      }
    }
  }
`

const ChatBox = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  margin: 0;
  border: 0;
  border-radius: 5px;
  overflow: hidden;
  grid-template-rows: 1fr auto;
  grid-gap: 4px;
  @media(max-width: 639px) {
    grid-gap: 2px;
  }
`
