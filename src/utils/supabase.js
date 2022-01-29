import { createClient } from '@supabase/supabase-js'
import { convertMessages } from './convertmessages'

const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)


export async function getMessages() {
    let messages = []
    try {
        await supabaseClient
            .from('messages')
            .select('*')
            .order('created_at', { ascending: false })
            .then(({ data }) => {
            messages = convertMessages(data)
            })
    } catch (e) {
        console.error(e)
        return []
    }
    return messages
}


export async function getServers() {
    let servers = []
    try {
        await supabaseClient
            .from('servers')
            .select('*')
            .order('created_at', { ascending: false })
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
            id = data.id
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