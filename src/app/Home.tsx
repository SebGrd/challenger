import { useState } from "react";
import { Link } from '@tanstack/react-router'
import ChallengesNavbar from "./components/challenges/ChallengesNavbar";
import ChallengesTokens from "./components/challenges/ChallengesTokens";


const exemple = {
    "accountId": 208206763,
    "displayName": "Katxu",
    "gameName": "seb",
    "internalName": "Katxu",
    "nameChangeFlag": false,
    "percentCompleteForNextLevel": 38,
    "privacy": "PUBLIC",
    "profileIconId": 6760,
    "puuid": "25021ad0-e2a8-545d-8222-cad94af41533",
    "rerollPoints": {
        "currentPoints": 318,
        "maxRolls": 2,
        "numberOfRolls": 1,
        "pointsCostToRoll": 250,
        "pointsToReroll": 182
    },
    "summonerId": 79107003,
    "summonerLevel": 509,
    "tagLine": "katxu",
    "unnamed": false,
    "xpSinceLastLevel": 1175,
    "xpUntilNextLevel": 3072
}

export default function Home() {
    const [data, setData] = useState(null);


    const getSummonerInfo = async () => {
        const data = await window.lcuApi.getSummoner();
        console.log(data);
        setData(data);
    }
    return (
        <div>
            <section>
                <div className="flex justify-between px-8 py-2">
                    <h1 className="text-3xl font-medium uppercase">Expertise <span className="text-xs">(friends logo)</span></h1>
                    <ChallengesTokens nbBronze={2} nbGold={4} nbDiamond={8} nbMaster={10}/>
                </div>
            </section>

            <section className="px-8 mb-6">
                <div className="border border-zinc-800 h-8 relative">
                    <div className="bg-blue-400 w-1/2 h-full absolute left-0 top-0"></div>
                    <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">1680/1800</p>
                </div>
            </section>
            <section className="px-8 flex items-center gap-4 mb-6">
                <input type="text" placeholder="Search..." className="bg-zinc-900 border border-zinc-700 px-2 py-1 outline-none text-sm" />
                <select name="order" id="order" className="bg-zinc-900 border border-zinc-700 py-1 text-sm" >
                    <option value="1">Groups</option>
                    <option value="1">Rank</option>
                    <option value="1">Completion (%)</option>
                    <option value="1">Completion (Unit)</option>
                    <option value="1">A-Z</option>
                </select>
                <div className="border border-zinc-900 flex items-center">
                    <div className="border-r border-zinc-900 py-[0.30rem] px-2 text-sm bg-zinc-800">Summoner's rift</div>
                    <div className="border-r border-zinc-900 py-[0.30rem] px-2 text-sm bg-zinc-800">ARAM</div>
                    <div className="border-r border-zinc-900 py-[0.30rem] px-2 text-sm bg-zinc-800">Coop vs AI</div>
                    <div className="py-[0.30rem] px-2 text-sm">Arena</div>
                </div>
            </section>
            <section className="px-8 mb-8">
                <h2 className="text-2xl font-medium mb-4">Capstones</h2>
                <div className="flex flex-wrap">
                    <article className="w-1/3 pr-4">
                        <div className="flex gap-4 border-l-4 border-rank-bronze bg-rank-bronze bg-opacity-15 p-4">
                            <div className="size-16 object-cover overflow-hidden rounded-full">
                                <img src="https://raw.communitydragon.org/latest/game/assets/challenges/config/101000/tokens/bronze.png" alt="" />
                            </div>
                            <div className="grow">
                                <h3>ARAM Authority</h3>
                                <div className="border border-zinc-800 bg-zinc-900 h-6 relative mb-2">
                                    <div className="bg-blue-400 w-1/2 h-full absolute left-0 top-0"></div>
                                    <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">1680/1800</p>
                                </div>
                                <p className="text-sm text-zinc-400 mb-2">Earn progress by completing challenges in the groups below:</p>
                                <div className="flex items-center gap-2">
                                    <div className="size-8 object-cover overflow-hidden rounded-full">
                                        <img src="https://raw.communitydragon.org/latest/game/assets/challenges/config/101000/tokens/bronze.png" alt="" />
                                    </div>
                                    <div className="size-8 object-cover overflow-hidden rounded-full">
                                        <img src="https://raw.communitydragon.org/latest/game/assets/challenges/config/101000/tokens/bronze.png" alt="" />
                                    </div>
                                    <div className="size-8 object-cover overflow-hidden rounded-full">
                                        <img src="https://raw.communitydragon.org/latest/game/assets/challenges/config/101000/tokens/bronze.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                    <article className="w-1/3 pr-4">
                        <div className="flex gap-4 border-l-4 border-rank-platinum bg-rank-platinum bg-opacity-15 p-4">
                            <div className="size-16 object-cover overflow-hidden rounded-full">
                                <img src="https://raw.communitydragon.org/latest/game/assets/challenges/config/101000/tokens/platinum.png" alt="" />
                            </div>
                            <div className="grow">
                                <h3>ARAM Authority</h3>
                                <div className="border border-zinc-800 bg-zinc-900 h-6 relative mb-2">
                                    <div className="bg-blue-400 w-1/2 h-full absolute left-0 top-0"></div>
                                    <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">1680/1800</p>
                                </div>
                                <p className="text-sm text-zinc-400 mb-2">Earn progress by completing challenges in the groups below:</p>
                                <div className="flex items-center gap-2">
                                    <div className="size-8 object-cover overflow-hidden rounded-full">
                                        <img src="https://raw.communitydragon.org/latest/game/assets/challenges/config/101000/tokens/platinum.png" alt="" />
                                    </div>
                                    <div className="size-8 object-cover overflow-hidden rounded-full">
                                        <img src="https://raw.communitydragon.org/latest/game/assets/challenges/config/101000/tokens/bronze.png" alt="" />
                                    </div>
                                    <div className="size-8 object-cover overflow-hidden rounded-full">
                                        <img src="https://raw.communitydragon.org/latest/game/assets/challenges/config/101000/tokens/bronze.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                    <article className="w-1/3 pr-4">
                        <div className="flex gap-4 border-l-4 border-rank-bronze bg-rank-bronze bg-opacity-15 p-4">
                            <div className="size-16 object-cover overflow-hidden rounded-full">
                                <img src="https://raw.communitydragon.org/latest/game/assets/challenges/config/101000/tokens/bronze.png" alt="" />
                            </div>
                            <div className="grow">
                                <h3>ARAM Authority</h3>
                                <div className="border border-zinc-800 bg-zinc-900 h-6 relative mb-2">
                                    <div className="bg-blue-400 w-1/2 h-full absolute left-0 top-0"></div>
                                    <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">1680/1800</p>
                                </div>
                                <p className="text-sm text-zinc-400 mb-2">Earn progress by completing challenges in the groups below:</p>
                                <div className="flex items-center gap-2">
                                    <div className="size-8 object-cover overflow-hidden rounded-full">
                                        <img src="https://raw.communitydragon.org/latest/game/assets/challenges/config/101000/tokens/bronze.png" alt="" />
                                    </div>
                                    <div className="size-8 object-cover overflow-hidden rounded-full">
                                        <img src="https://raw.communitydragon.org/latest/game/assets/challenges/config/101000/tokens/bronze.png" alt="" />
                                    </div>
                                    <div className="size-8 object-cover overflow-hidden rounded-full">
                                        <img src="https://raw.communitydragon.org/latest/game/assets/challenges/config/101000/tokens/bronze.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
            <section className="px-8">
                <h2 className="text-2xl font-medium mb-4">Groups</h2>
                <div className="flex flex-wrap">
                    <article className="w-full pr-4">
                        <div className="flex gap-4 border-l-4 border-rank-grandmaster bg-rank-grandmaster bg-opacity-15 p-4">
                            <div className="size-24 object-cover overflow-hidden rounded-full">
                                <img src="https://raw.communitydragon.org/latest/game/assets/challenges/config/101000/tokens/grandmaster.png" alt="" />
                            </div>
                            <div className="grow">
                                <h3>ARAM WARRIOR</h3>
                                <div className="border border-zinc-800 bg-zinc-900 h-6 relative mb-2">
                                    <div className="bg-blue-400 w-1/2 h-full absolute left-0 top-0"></div>
                                    <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">1680/1800</p>
                                </div>
                                <p className="text-sm text-zinc-400 mb-6">Earn progress in this group by completing the challenges below:</p>

                                <div className="flex items-center gap-2">
                                    <div className="bg-rank-grandmaster bg-opacity-15 border border-t-4 border-rank-grandmaster p-2">
                                        <div className="flex items-start gap-2 mb-4">
                                            <div className="size-16 object-cover overflow-hidden rounded-full">
                                                <img src="https://raw.communitydragon.org/latest/game/assets/challenges/config/101000/tokens/grandmaster.png" alt="" />
                                            </div>
                                            <div>
                                                <p className="text-lg font-bold">DPS Threat</p>
                                                <p className="text-sm">Deal more than 1800 DPM</p>
                                                <div className="flex gap-2">
                                                    <div>iMap</div>
                                                    <div>iFriend</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border border-zinc-800 bg-zinc-900 h-5 relative mb-2">
                                            <div className="bg-blue-400 w-1/2 h-full absolute left-0 top-0"></div>
                                            <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-sm">1680/1800</p>
                                        </div>
                                    </div>

                                    <div className="bg-rank-master bg-opacity-15 border border-rank-master border-t-4 p-2">
                                        <div className="flex items-start gap-2 mb-4">
                                            <div className="size-16 object-cover overflow-hidden rounded-full">
                                                <img src="https://raw.communitydragon.org/latest/game/assets/challenges/config/101000/tokens/master.png" alt="" />
                                            </div>
                                            <div>
                                                <p className="text-lg font-bold">DPS Threat</p>
                                                <p className="text-sm">Deal more than 1800 DPM</p>
                                                <div className="flex gap-2">
                                                    <div>iMap</div>
                                                    <div>iFriend</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border border-zinc-800 bg-zinc-900 h-5 relative mb-2">
                                            <div className="bg-blue-400 w-1/2 h-full absolute left-0 top-0"></div>
                                            <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-sm">1680/1800</p>
                                        </div>
                                    </div>

                                    <div className="bg-rank-diamond bg-opacity-15 border border-rank-diamond border-t-4 border-t-rank-diamond p-2">
                                        <div className="flex items-start gap-2 mb-4">
                                            <div className="size-16 object-cover overflow-hidden rounded-full">
                                                <img src="https://raw.communitydragon.org/latest/game/assets/challenges/config/101000/tokens/diamond.png" alt="" />
                                            </div>
                                            <div>
                                                <p className="text-lg font-bold">Bad medicine</p>
                                                <p className="text-sm">Kill enemies recedntly healed by a health pack</p>
                                                <div className="flex gap-2">
                                                    <div>iMap</div>
                                                    <div>iFriend</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border border-zinc-800 bg-zinc-900 h-5 relative mb-2">
                                            <div className="bg-blue-400 w-1/2 h-full absolute left-0 top-0"></div>
                                            <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-sm">1680/1800</p>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </article>
                </div>
            </section>

            {data &&
                <section>
                    <div>
                        <img src="https://ddragon.leagueoflegends.com/cdn/14.23.1/img/profileicon/6760.png" alt="Summoner icon" />
                    </div>
                    <p><strong>{data.gameName}</strong>#{data.tagLine}</p>
                </section>
            }
            <button onClick={() => getSummonerInfo()}>Get summoners info</button>
            <p>{data && JSON.stringify(data)}</p>
        </div>
    )
}