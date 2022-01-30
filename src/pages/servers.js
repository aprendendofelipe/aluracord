/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import theme from '../styles/theme'
import Chat from '../components/chat'
import { PageSubtitle } from '../components/Head'
import { getServers, getMessages, ServersRealTime } from '../utils/supabase'
import { useWarnStars } from '../utils/starsquestion'


export default function ServersPage(props) {
  const router = useRouter()
  const username = router.query.username
  const [screen, setScreen] = useState('main')
  const [iframeSrc, setIframeSrc] = useState('')
  const [servers, setServers] = useState(() => props.servers)

  useWarnStars()

  useEffect(() => {
    const subscription = ServersRealTime((server) => {
      setServers((servers) => {
        return [
          server,
          ...servers,
        ]
      });
    });
    
    getServers(servers)
    .then((srvs)=> setServers(srvs))

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
      <li key={"a"}>
              <button onClick={() => {
                props.setScreen('main')
              }} >
                <img
                  src="https://deltime.com.br/wp-content/uploads/2019/03/seguran%C3%A7a-de-datacenters-Deltime.jpg"
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
  height: 100%;
  width: 100%;
  @media(min-width: 640px) {
    padding: 16px;
    grid-gap: 16px;
    grid-template-columns: 72px 1fr;
  }
  @media(max-width: 639px) {
    padding: 6px;
    grid-gap: 6px;
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
    width: calc(100vw - 12px);
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
      width: calc(100vw - 138px);
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