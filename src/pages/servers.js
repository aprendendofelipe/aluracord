import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Chat from '../components/Chat'
import { PageSubtitle } from '../components/Head'
import { getServers, getMessages, MessagesRealTime } from '../utils/supabase'
import { useWarnStars } from '../utils/starsquestion'
import ServerData from '../components/ServerData'
import AddSrvPage from '../components/AddSrv'
import Menu from '../components/Menu'
import ExtSrvBox from '../components/ExtSrvBox'
import { convertMessage } from '../utils/convertmessages'


export default function ServersPage(props) {
  const router = useRouter()
  const username = router.query.username
  const [screen, setScreen] = useState('main')
  const [iframeSrv, setIframeSrv] = useState('')
  const [messages, setMessages] = useState(() => props.messages)
  const servers = props.servers

  useWarnStars()

  useEffect(() => {
    const subscription = MessagesRealTime((message) => {
      const msg = convertMessage(message)
      setMessages((msgs) => {
        return [
          msg,
          ...msgs,
        ]
      })
    })

    getMessages(messages)
      .then((msgs) => setMessages(msgs))

    return () => {
      subscription.unsubscribe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (<>
    <PageSubtitle>Servidores</PageSubtitle>
    <HomeScreen>
      <Menu
        username={username}
        screen={screen}
        setScreen={setScreen}
        iframeSrv={iframeSrv}
        setIframeSrv={setIframeSrv}
        servers={servers}
      />
      {screen === 'main'
        && <Chat
          username={username}
          messages={messages}
          setMessages={setMessages}
        />}
      {screen == 'add'
        && <AddSrvPage></AddSrvPage>}
      {screen == 'chat'
        && <ExtSrvBox>
          <iframe
            height={'100%'}
            width={'100%'}
            frameBorder={0}
            allowFullScreen={false}
            src={iframeSrv.autoUser ? iframeSrv.url + username : iframeSrv.url}
          />
          <ServerData iframeSrv={iframeSrv} username={username} />
        </ExtSrvBox>}
    </HomeScreen>
  </>)
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


const HomeScreen = (props) => (
  <div className='HomeScreen' {...props}>
    {props.children}
    <style jsx>{`
      .HomeScreen {
        display: grid;
        height: 100vh;
        width: 100vw;
        padding: 6px;
        grid-gap: 6px;
        justify-items: center;
      }
      @media screen and (max-width: 649px) {
        .HomeScreen {
          grid-template-rows: 80px 1fr;
        }
      }
      @media screen and (min-width: 640px) {
        .HomeScreen {
          padding: 16px;
          grid-gap: 16px;
          grid-template-columns: 80px 1fr;
        }
      }
    `}</style>
  </div>
)