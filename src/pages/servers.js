/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import theme from '../styles/theme'
import Chat from '../components/chat'
import { PageSubtitle } from '../components/Head'
import {getServers, getMessages, ServersRealTime} from '../utils/supabase'


export default function ServersPage(props) {
  const router = useRouter()
  const username = router.query.username
  const [screen, setScreen] = useState('main')
  const [iframeSrc, setIframeSrc] = useState('')
  const [servers, setServers] = useState(() => props.servers)

  useEffect(() => {
    const subscription = ServersRealTime((server) => {
      setServers((servers) => {
        return [
          server,
          ...servers,
        ]
      });
    });

    return () => {
      subscription.unsubscribe();
    }
  }, [])

  return (<>
    <PageSubtitle>Servidores</PageSubtitle>
    <HomeScreen>  
      <SideBar>
        <SideMenu
          username={username}
          setScreen={setScreen}
          setIframeSrc={setIframeSrc}
          servers={servers}
        />
      </SideBar>  
      {screen === 'main'
        ? <Chat
          username={username}
          messages={props.messages}
        />
        : <iframe
          height={'100%'}
          width={'100%'}
        frameBorder={0}
        allowFullScreen={false}
          // src={`https://aluracord-lfs9902.vercel.app/chat?username=${username}`} />
          src={iframeSrc} />}
    </HomeScreen>
  </>)
}

function SideMenu(props) {
  const servers = props.servers

  return (
    <>
      <button onClick={()=>{props.setScreen('main')}} >
        <img
          src={`https://github.com/${props.username}.png`}
          alt={props.username}
        />
        </button>
      <button onClick={()=>{props.setScreen('main')}} >
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
      </button>
      <ul>
      <li key={1}>
              <button onClick={() => {
                props.setScreen('main')
              }} >
                <img
                  src="https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg"
                  alt="main chat"
                />
                {/* {server.name} */}
              </button>
            </li>
        {servers.map((server) => {
          return (
            <li key={server.url}>
              <button onClick={() => {
                props.setIframeSrc(server.autoUser ? server.url + props.username : server.url)
                props.setScreen('chat')
              }} >
                <img
                  src={server.imgSrc}
                  alt={server.name}
                />
                {/* {server.name} */}
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
  grid-gap: 16px;
  height: 100%;
  width: 100%;
  padding: 16px;
  background-color: ${theme.colors.primary[500]};
  background-image: url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-blend-mode: multiply;
  color: ${theme.colors.neutrals['000']};
  @media(min-width: 640px) {
    grid-template-columns: 72px 1fr;
  }
  @media(max-width: 639px) {
    grid-template-rows: 72px 1fr;
  }
`

const SideBar = styled.div`
  background-color: ${theme.colors.neutrals[700]};
  display: flex;
  height: 72px;
  width: 100%;
  /* align-items: center; */
  padding-top: 12px;
  padding-left: 12px;
  border-radius: 5px;
  gap: 12px;
  @media(min-width: 640px) {
    flex-direction: column;
    height: calc(100vh - 32px);
  }
  @media(max-width: 639px) {
    flex-direction: row;
    width: calc(100vw - 32px);
  }
  ul {
    display: flex;
    margin: 0;
    padding: 0;
    gap: 12px;
    overflow: auto;
    @media(min-width: 640px) {
      flex-direction: column;
      max-height: 100%;
      height: calc(100vh - 158px);
      padding-top: 8px;
      padding-bottom: 8px;
    }
    @media(max-width: 639px) {
      flex-direction: row;
      max-height: 100%;
      width: calc(100vw - 158px);
      padding-left: 8px;
      padding-right: 8px;
    }
  }

  button {
    cursor: pointer;
    background-color: ${theme.colors.neutrals[200]};
    display: flex;
    border: 0;
    border-radius: 50%;
    box-shadow: none;
    height: 48px;
    width: 48px;
    padding: 0;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    opacity: 1;
    :hover {
    border-radius: 40%;
    opacity: .6;
    }

    img {
      height: 100%;
    }
  }
`