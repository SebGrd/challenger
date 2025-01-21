process.traceProcessWarnings = true
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import started from 'electron-squirrel-startup';
import { connectToWebsocketAndSubscribeEvents } from './lcu/lcuWebsocket';
import { getClientStatus, lcuClient } from './lcu/lcuClient';
import { ClientStatus } from './types/client';
import { getAllTitles, getChallengeSummary, getSummoner, getSummonerProfile, getChallenges, getAsset, getChallengesCategories } from './lcu/LcuRequest';


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#18181b',
      symbolColor: '#09090b',
      height: 16
    },
    icon: path.join(__dirname, 'assets/icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      zoomFactor: 1,
    },
  });
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  mainWindow.webContents.openDevTools();

  return mainWindow;
};


app.on('ready', async () => {

  const win = createWindow();

  ipcMain.handle('lcu:getSummoner', async () => {
    return await getSummoner();
  });
  ipcMain.handle('lcu:getSummonerProfile', async () => {
    return await getSummonerProfile();
  });
  ipcMain.handle('lcu:getAllTitle', async () => {
    return await getAllTitles();
  });
  ipcMain.handle('lcu:getChallenges', async () => {
    return await getChallenges();
  });
  ipcMain.handle('lcu:getChallengeSummary', async () => {
    return await getChallengeSummary();
  });
  ipcMain.handle('lcu:getChallengesCategories', async () => {
    return await getChallengesCategories();
  });
  ipcMain.handle('lcu:getAsset', async (_, url) => {
    return await getAsset(url);
  });

  ipcMain.handle('lcu:getClientStatus', async () => {
    return await getClientStatus();
  });


  // Connecting & registering to LCU events before the lcuClient is ready because
  // if the LeagueCLientUx is already running, the lcuClient will not trigger the 'connect' event
  connectToWebsocketAndSubscribeEvents(win);

  const client = await lcuClient();

  client.on('connect', () => {
    console.log('Connected to LCU');
    win.webContents.send('lcu:updateClientStatus', ClientStatus.ONLINE);
    // Reconnect to websocket and subscribe to events when the client is reconnected
    connectToWebsocketAndSubscribeEvents(win);
  });
  client.on('disconnect', () => {
    console.log('Disconnected from LCU');
    win.webContents.send('lcu:updateClientStatus', ClientStatus.OFFLINE);
  });
  client.start();

});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
