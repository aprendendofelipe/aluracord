export function convertMessage(msg) {
  return {
    from: msg.de,
    text: msg.texto,
    id: msg.id,
    created_at: msg.created_at
  }
}

export function convertMessages(data) {
  let msgs = []
  if (data.length > 0) {
    msgs = data.map(msg => convertMessage(msg))
  }
  return msgs
}