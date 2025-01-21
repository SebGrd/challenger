import { ClientStatus } from "./types/client";
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('lcuApi', {
    onUpdateClientStatus: (callback: (status: ClientStatus) => void) => ipcRenderer.on('lcu:updateClientStatus', (_, status: ClientStatus) => callback(status)),
    onLobbyUpdate: (callback: (lobbyData: any) => void) => ipcRenderer.on('lcu:lobbyUpdate', (_, lobbyData) => callback(lobbyData)),
    getSummoner: () => ipcRenderer.invoke('lcu:getSummoner'),
    getSummonerProfile: () => ipcRenderer.invoke('lcu:getSummonerProfile'),
    getChallenges: () => ipcRenderer.invoke('lcu:getChallenges'),
    getChallengeSummary: () => ipcRenderer.invoke('lcu:getChallengeSummary'),
    getChallengesCategories: () => ipcRenderer.invoke('lcu:getChallengesCategories'),
    getAllTitle: () => ipcRenderer.invoke('lcu:getAllTitle'),
    getClientStatus: () => ipcRenderer.invoke('lcu:getClientStatus'),
    getAsset: (url: string) => ipcRenderer.invoke('lcu:getAsset', url),
});

