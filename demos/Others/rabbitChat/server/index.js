import { WebSocketServer } from 'ws'
const wss = new WebSocketServer({ port: 8080 })
wss.on(
  'connection',
  function connection(ws, req) {
    ws.on('message', function message(data) {
      console.log('[data]: ', data.toString())
      wss.clients.forEach((it) => {
        it.send(data.toString())
      })
    })
  }
)
