import { createClient } from '@supabase/supabase-js'
import { convertMessages } from './convertmessages'

const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)


export async function getMessages(messagesOld = []) {
    let messages = []
    let timeLastMessage = ""
    if (messagesOld.length > 0) {
        timeLastMessage = messagesOld[0]?.created_at.slice(0, -6) + "Z"
    }
    console.log("time: ", messagesOld[0]?.created_at, timeLastMessage)
    try {
        if (!timeLastMessage) {
            await supabaseClient
                .from('messages')
                .select('*')
                .order('created_at', { ascending: false })
                .then(({ data }) => {
                    messages = convertMessages(data)
                    console.log('debug1 - !timeLastMessage msg.lenght: ', messages.length)
                })
        } else {
            await supabaseClient
                .from('messages')
                .select('*')
                .gt('created_at', timeLastMessage)
                .order('created_at', { ascending: false })
                .then(({ data }) => {
                    // messages = convertMessages(data.filter((msg) => msg.id != messagesOld[0].id))
                    console.log('data: ', data)
                    messages = convertMessages(data)
                    console.log('debug2 - timeLastMessage msg.lenght: ', messages.length)
                })
        }
    } catch (e) {
        console.error(e)
        return []
    }
    console.log('debug3 - msgOld.lenght: ', messagesOld.length)
    return [...messages, ...messagesOld]
}


export async function getServers() {
    let servers = []
    try {
        await supabaseClient
            .from('servers')
            .select('url, name, imgSrc, autoUser')
            .gt('sequence', 0)
            .order('sequence', { ascending: false })
            .then(({ data }) => {
                servers = data
            })
    } catch (e) {
        console.error(e)
        return []
    }
    return servers
}

export function ServersRealTime(addSrv) {
    return supabaseClient
        .from('servers')
        .on('INSERT', (resp) => {
            addSrv(resp.new);
        })
        .subscribe();
}

export function MessagesRealTime(addMsg) {
    return supabaseClient
        .from('messages')
        .on('INSERT', (resp) => {
            addMsg(resp.new);
        })
        .subscribe();
}

export async function DeleteMessage(msgToDelete) {
    let id = ''
    await supabaseClient
        .from('messages')
        .delete()
        .match({ id: msgToDelete.id })
        .then(({ data }) => {
            id = data[0].id
        })
    return id
}

export async function SaveNewMessage(message) {
    await supabaseClient
        .from('messages')
        .insert([
            message
        ])
}

export async function SaveNewServer(server) {
    await supabaseClient
        .from('servers')
        .insert([
            server
        ])
}

export default supabaseClient