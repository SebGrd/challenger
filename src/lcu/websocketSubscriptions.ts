import { LeagueWebSocket } from "league-connect";

export function subscribeToEvents(ws: LeagueWebSocket, win: Electron.BrowserWindow) {
    ws.onclose = () => {
        console.log('Websocket closed');
    };
    ws.subscribe('/lol-champ-select/v1/session', (message) => {
        console.log('-------------/lol-champ-select/v1/session-------------');
        console.log(message);
        win.webContents.send('lcu:lobbyUpdate', message);
    });
    ws.subscribe('/lol-challenges/v1/my-updated-challenges', (message) => {
        console.log('-------------/lol-challenges/v1/my-updated-challenges-------------');
        console.log(message);
    });
    ws.subscribe('/lol-challenges/v1/challenges', (message) => {
        console.log('-------------/lol-challenges/v1/challenges-------------');
        console.log(message);
    });
    ws.subscribe('/lol-chat/v1/me', (message) => {
        console.log('-------------/lol-chat/v1/me-------------');
        console.log(message);
    });
}

