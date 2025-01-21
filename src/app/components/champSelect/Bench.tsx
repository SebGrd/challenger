import useChampion from "@/hooks/useChampion";
import { LolChampSelectChampSelectSession } from "@hasagi/core/types/lcu-types";

export default function Bench(
    { champions = [{ championId: 55 }, { championId: 21 }], championsToPlay = [55] }: { champions?: LolChampSelectChampSelectSession['benchChampions'], championsToPlay?: number[] }) {
    const { getThumbnail } = useChampion();
    return (
        <div>
            <div className='flex items-center gap-2'>
                {Array.from({ length: 10 }).map((_, i) => {
                    if (championsToPlay.includes(champions[i]?.championId)) return <div className="relative size-16 rounded-lg overflow-hidden z-0">
                        <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 animate-gradient" />
                        <div className="absolute inset-[4px] bg-zinc-800 rounded-lg -z-10">
                            {champions[i] && (
                                <img src={getThumbnail(champions[i].championId)} alt="Benched champ" />
                            )}
                        </div>
                    </div>
                    return <div className='size-16 border border-zinc-500 bg-zinc-800'>
                        {champions[i] && (
                            <img src={getThumbnail(champions[i].championId)} alt="Benched champ" />
                        )}
                    </div>
                }
                )}
            </div>
        </div>
    );
}