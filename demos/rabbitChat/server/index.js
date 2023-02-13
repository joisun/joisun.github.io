import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 80 })

wss.on(
  'connection',
  function connection(ws, req) {
    // const ip = req.socket.remoteAddress;
    // wss.clients.forEach((it) => {
    //   it.send('');
    // });
    ws.on('message', function message(data) {
      console.log('[data]: ', data.toString())
      wss.clients.forEach((it) => {
        it.send(data.toString())
      })
    })
  }
)
