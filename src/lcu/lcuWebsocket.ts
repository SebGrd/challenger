import { createWebSocketConnection, LeagueWebSocket } from 'league-connect'
import { subscribeToEvents } from './websocketSubscriptions'


export async function lcuWebsocket() {
    const ws = await createWebSocketConnection({
        authenticationOptions: {
            // This is blocking the process until the promise is resolved
            awaitConnection: true
        },
    })
    return ws
}

export async function connectToWebsocketAndSubscribeEvents(win: Electron.BrowserWindow) {
    const ws = await lcuWebsocket()
    console.log('LCU Websocket connected')
    subscribeToEvents(ws, win)
}