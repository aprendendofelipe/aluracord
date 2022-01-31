import { createClient } from '@supabase/supabase-js'
import { convertMessages } from './convertmessages'

const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)


export async function getMessages(messagesOld=[]) {
    const timeLastMessage = messagesOld[0]?.created_at
    let messages = []
    try {
        if (!timeLastMessage) {
            await supabaseClient
                .from('messages')
                .select('*')
                .order('created_at', { ascending: false })
                .then(({ data }) => {
                    messages = convertMessages(data)
            })
        } else {
            await supabaseClient
                .from('messages')
                .select('*')
                .gt('created_at', timeLastMessage)
                .order('created_at', { ascending: false })
                .then(({ data }) => {
                    messages = convertMessages(data)
                })
        }
    } catch (e) {
        console.error(e)
        return []
    }
    return [...messages, ...messagesOld]
}


export async function getServers(serversOld=[]) {
    const timeLastServer = serversOld[0]?.created_at
    let servers = []
    try {
        if (!timeLastServer){
            await supabaseClient
                .from('servers')
                .select('*')
                .order('created_at', { ascending: false })
                .then(({ data }) => {
                    servers = data
                })
        } else {
            await supabaseClient
                .from('servers')
                .select('*')
                .gt('created_at', timeLastServer)
                .order('created_at', { ascending: false })
                .then(({ data }) => {
                    servers = data
                })
        }
    } catch (e) {
        console.error(e)
        return []
    }
    return [...servers, ...serversOld]
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

export default supabaseClient