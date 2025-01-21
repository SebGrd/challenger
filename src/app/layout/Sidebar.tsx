import { useQuery } from "@tanstack/react-query";
import { Ranks, SummonerProfile } from "@/../types/lol";
import ProfileIcon from "../components/profile/ProfileIcon";
import ChallengesCategoryProgress from "@/components/challenges/ChallengesCategoryProgress";
import { useStore } from "@/context/StoreContext";
import { IconChallenge } from "@/components/ui/svgs";
import { cn } from "@/lib/utils";

export default function Sidebar() {
    const { challengesSummary } = useStore()
    const summoner = useQuery({
        queryKey: ['summoner'],
        queryFn: async () => {
            try {
                const response = await window.lcuApi.getSummoner();
                return response;
            } catch (error) {
                console.error(error);
                throw new Error('Error while fetching summoner data');
            }
        }
    });
    const profile = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            try {
                return await window.lcuApi.getSummonerProfile() as SummonerProfile;
            } catch (error) {
                console.error(error);
                throw new Error('Error while fetching profile data');
            }
        },
    });

    return (
        <aside className="bg-zinc-950 w-[250px] h-full grid grid-rows-2">
            {summoner.isLoading && <p className="text-center p-4 text-zinc-400">Loading...</p>}
            {summoner.isError && <p className="text-center p-4 text-red-400">Error: Profile unavailable at the time</p>}
            {summoner.isSuccess && profile.isSuccess && challengesSummary.isSuccess &&
                <>
                    <section className="relative flex flex-col items-center gap-3 py-2 px-2 z-0">
                        <img
                            src="https://raw.communitydragon.org/14.24/game/assets/loadouts/regalia/banners/11_arcane_fractured_jinx_banner.png"
                            className="absolute top-0 w-[500px] -z-10 max-w-none pointer-events-none"
                            alt="banner" />
                        <ProfileIcon
                            crestType={profile.data.regalia.crestType}
                            selectedPrestigeCrest={profile.data.regalia.selectedPrestigeCrest}
                            rankedLeagueTier={summoner.data.lol.rankedLeagueTier}
                            rankedLeagueDivision={summoner.data.lol.rankedLeagueDivision}
                            icon={summoner.data.icon}
                            overallChallengeLevel={challengesSummary.data.overallChallengeLevel as Exclude<Ranks, Ranks.EMERALD>}
                        />
                        <div>
                            <p className="text-center text-lg"><span className="font-semibold">{summoner.data.gameName}</span><span className="text-zinc-500">#{summoner.data.gameTag}</span></p>
                            <p className="text-sm font-light text-center text-zinc-400 mb-2"><i>{challengesSummary.data.title?.name}</i></p>
                            <div className="flex items-center gap-1  mb-2">
                                <IconChallenge className={cn({
                                    'fill-rank-iron': challengesSummary.data.overallChallengeLevel === Ranks.IRON,
                                    'fill-rank-bronze': challengesSummary.data.overallChallengeLevel === Ranks.BRONZE,
                                    'fill-rank-silver': challengesSummary.data.overallChallengeLevel === Ranks.SILVER,
                                    'fill-rank-gold': challengesSummary.data.overallChallengeLevel === Ranks.GOLD,
                                    'fill-rank-platinum': challengesSummary.data.overallChallengeLevel === Ranks.PLATINUM,
                                    'fill-rank-diamond': challengesSummary.data.overallChallengeLevel === Ranks.DIAMOND,
                                    'fill-rank-master': challengesSummary.data.overallChallengeLevel === Ranks.MASTER,
                                    'fill-rank-grandmaster': challengesSummary.data.overallChallengeLevel === Ranks.GRANDMASTER,
                                    'fill-rank-challenger': challengesSummary.data.overallChallengeLevel === Ranks.CHALLENGER,
                                })} />
                                <p className="text-sm text-center">
                                    <span className="capitalize">{challengesSummary.data?.overallChallengeLevel?.toLowerCase()}</span> ({challengesSummary.data.totalChallengeScore} pts)
                                </p>
                            </div>

                        </div>
                        {challengesSummary.data?.topChallenges?.length > 0 &&
                            <div className="flex items-center justify-center gap-2">
                                <div>
                                    <img
                                        src={`https://raw.communitydragon.org/14.24/game/assets/challenges/config/${challengesSummary.data.topChallenges[0].id}/tokens/${challengesSummary.data.topChallenges[0].currentLevel.toLowerCase()}.png`}
                                        alt="Challenger token" className="size-12" />
                                </div>
                                <div>
                                    <img
                                        src={`https://raw.communitydragon.org/14.24/game/assets/challenges/config/${challengesSummary.data.topChallenges[1].id}/tokens/${challengesSummary.data.topChallenges[1].currentLevel.toLowerCase()}.png`}
                                        alt="Challenger token"
                                        className="size-12" />
                                </div>
                                <div>
                                    <img
                                        src={`https://raw.communitydragon.org/14.24/game/assets/challenges/config/${challengesSummary.data.topChallenges[2].id}/tokens/${challengesSummary.data.topChallenges[2].currentLevel.toLowerCase()}.png`}
                                        alt="Challenger token"
                                        className="size-12" />
                                </div>
                            </div>
                        }
                    </section>
                    <section className="px-6 pb-6 content-end">
                        <ChallengesCategoryProgress categoryProgress={challengesSummary.data.categoryProgress ?? []} />
                    </section>
                </>
            }
        </aside>
    )
}