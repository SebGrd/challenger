import { Ranks } from "@/../types/lol";
import Crest, { CrestType, PrestigeCrest } from "./Crest";
import ChallengesCrystals from "../challenges/ChallengesCrystal";

type ProfileIconProps = {
    crestType: CrestType;
    selectedPrestigeCrest: PrestigeCrest;
    rankedLeagueTier: Ranks;
    rankedLeagueDivision: string;
    icon: number;
    overallChallengeLevel: Exclude<Ranks, Ranks.EMERALD>;
};

export default function ProfileIcon({
    crestType,
    selectedPrestigeCrest,
    rankedLeagueTier,
    rankedLeagueDivision,
    icon,
    overallChallengeLevel,

}: ProfileIconProps) {
    return (
        <div className="relative mt-16 mb-8">
            {crestType === CrestType.RANKED &&
                <>
                    <div className="absolute size-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover overflow-hidden pointer-events-none">
                        <Crest
                            crestType={CrestType.RANKED}
                            selectedPrestigeCrest={selectedPrestigeCrest}
                            rankedTier={rankedLeagueTier}
                        />
                    </div>
                    {![Ranks.MASTER, Ranks.GRANDMASTER, Ranks.CHALLENGER].includes(rankedLeagueTier) &&
                        <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 text-sm">{rankedLeagueDivision}</div>
                    }
                </>
            }
            {crestType === CrestType.PRESTIGE &&
                <div className="absolute size-[200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover overflow-hidden pointer-events-none">
                    <Crest
                        crestType={CrestType.PRESTIGE}
                        selectedPrestigeCrest={selectedPrestigeCrest}
                        rankedTier={rankedLeagueTier}
                    />
                </div>
            }
            <div className="rounded-full object-cover overflow-hidden size-[90px]">
                <img src={`https://ddragon.leagueoflegends.com/cdn/14.24.1/img/profileicon/${icon}.png`} alt="Summoner icon" />
            </div>
            <div className="rounded-full object-cover overflow-hidden size-[80px] absolute top-full left-1/2 -translate-y-1/3 -translate-x-1/2 pointer-events-none">
                <ChallengesCrystals rank={overallChallengeLevel} />
            </div>
        </div>
    )
}