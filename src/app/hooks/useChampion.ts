import { useEffect, useState } from "react";


type CDragonChampion = {
    id: number,
    name: string,
    alias: string,
    squarePortraitPath: string,
    roles: string[]
}

export default function useChampion() {
    const [champions, setChampions] = useState<CDragonChampion[]>([]);
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json');
                const data = await response.json();
                setChampions(data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return {
        getThumbnail: (championId: number) => {
            return `https://cdn.communitydragon.org/latest/champion/${championId}/square`;
        },
        getName: (championId: number) => {
            return champions.find(champion => champion.id === championId)?.name;
        }
    }
}