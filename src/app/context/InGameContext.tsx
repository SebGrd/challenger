import { createContext, useEffect, useState } from "react";
import { ClientStatus, GameStatus } from "@/../types/client";


export const InGameContext = createContext({
    status: GameStatus.OUT_OF_GAME,
    champSelectData: {},
});

export default function InGameProvider({ children }: { children: React.ReactNode }) {
    const [status, setStatus] = useState(GameStatus.OUT_OF_GAME);
    const [champSelectData, setChampSelectData] = useState({});

    useEffect(() => {
        window.lcuApi.onLobbyUpdate((champSelectData: any) => {
            console.log('champ select data', champSelectData);
            setChampSelectData(champSelectData);
        });
    }, []);

    return (
        <InGameContext.Provider value={{
            status: status,
            champSelectData: champSelectData,
        }}>
            {children}
        </InGameContext.Provider>
    )
}
