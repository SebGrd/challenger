import { createContext, useEffect, useState } from "react";
import { ClientStatus } from "@/../types/client";


export const StatusContext = createContext({
    status: ClientStatus.OFFLINE,
    getClientStatus: () => { },
});

export default function StatusProvider({ children }: { children: React.ReactNode }) {
    const [status, setStatus] = useState(ClientStatus.OFFLINE);

    useEffect(() => {
        window.lcuApi.onUpdateClientStatus((status: ClientStatus) => {
            console.log('status', status);
            setStatus(status);
        });
    }, []);

    const getClientStatus = async () => {
        return await window.lcuApi.getClientStatus();
    }

    // Polling for client status when it's offline (startup process)
    useEffect(() => {
        if (status === ClientStatus.OFFLINE) {
            const interval = setInterval(async () => {
                const newStatus = await getClientStatus();
                if (newStatus === ClientStatus.ONLINE) {
                    setStatus(newStatus);
                    clearInterval(interval);
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [status]);

    return (
        <StatusContext.Provider value={{
            status: status,
            getClientStatus,
        }}>
            {children}
        </StatusContext.Provider>
    )
}
