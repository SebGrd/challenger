import { ClientStatus } from '@/types/client';
import { authenticate, LeagueClient } from 'league-connect'

export async function lcuClient() {
    const credentials = await authenticate();
    return new LeagueClient(credentials);
}

export async function getClientStatus() {
    try {
        const credentials = await authenticate();
        if (credentials) {
            return ClientStatus.ONLINE;
        }
    } catch (e) {
        return ClientStatus.OFFLINE;
    }
}