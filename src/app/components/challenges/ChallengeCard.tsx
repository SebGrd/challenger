import { Maps, Ranks } from "@/../types/lol";
import { ProgressBar } from "../statistics/ProgressBar";


import ironCorner from '@/images/challenges/challenge-card-points-container-iron.png';
import bronzeCorner from '@/images/challenges/challenge-card-points-container-bronze.png';
import silverCorner from '@/images/challenges/challenge-card-points-container-silver.png';
import goldCorner from '@/images/challenges/challenge-card-points-container-gold.png';
import platinumCorner from '@/images/challenges/challenge-card-points-container-platinum.png';
import diamondCorner from '@/images/challenges/challenge-card-points-container-diamond.png';
import masterCorner from '@/images/challenges/challenge-card-points-container-master.png';
import grandmasterCorner from '@/images/challenges/challenge-card-points-container-grandmaster.png';
import challengerCorner from '@/images/challenges/challenge-card-points-container-challenger.png';


import ironBackground from '@/images/challenges/challenge-card-background-iron.png';
import bronzeBackground from '@/images/challenges/challenge-card-background-bronze.png';
import silverBackground from '@/images/challenges/challenge-card-background-silver.png';
import goldBackground from '@/images/challenges/challenge-card-background-gold.png';
import platinumBackground from '@/images/challenges/challenge-card-background-platinum.png';
import diamondBackground from '@/images/challenges/challenge-card-background-diamond.png';
import masterBackground from '@/images/challenges/challenge-card-background-master.png';
import grandmasterBackground from '@/images/challenges/challenge-card-background-grandmaster.png';
import challengerBackground from '@/images/challenges/challenge-card-background-challenger.png';


import aramMap from '@/images/icons/icon-map-aram.svg';
import classicMap from '@/images/icons/icon-map-classic.svg';
import cherryMap from '@/images/icons/icon-map-cherry.svg';
import ProgressTicks from "../statistics/ProgressTicks";
import { useEffect, useState } from "react";
import { useStore } from "@/context/StoreContext";


type ChallengeCardProps = {
    id: number,
    rank: Exclude<Ranks, Ranks.EMERALD>,
    map: Maps,
    title: string,
    description: string,
    progress: number,
    progressIndictor: string,
    capstoneProgress: number,
    active: boolean,
    finished?: boolean,
    thresholds: Record<Exclude<Ranks, Ranks.EMERALD>, {
        value: number,
        rewards: any
    }>,
    overallProgressMode?: boolean,
    currentValue: number,
}

export default function ChallengeCard({
    id,
    rank,
    map,
    title,
    description,
    progress,
    progressIndictor,
    capstoneProgress,
    active = true,
    finished = false,
    thresholds,
    overallProgressMode = false,
    currentValue,
}: ChallengeCardProps) {
    const { challenges } = useStore();
    const [filteredThresholds, setFilteredThresholds] = useState();
    const [maxValue, setMaxValue] = useState(0);

    const imgs = {
        "NONE": {
            corner: ironCorner,
            background: ironBackground,
        },
        [Ranks.IRON]: {
            corner: ironCorner,
            background: ironBackground,
        },
        [Ranks.BRONZE]: {
            corner: bronzeCorner,
            background: bronzeBackground,
        },
        [Ranks.SILVER]: {
            corner: silverCorner,
            background: silverBackground,
        },
        [Ranks.GOLD]: {
            corner: goldCorner,
            background: goldBackground
        },
        [Ranks.PLATINUM]: {
            corner: platinumCorner,
            background: platinumBackground
        },
        [Ranks.DIAMOND]: {
            corner: diamondCorner,
            background: diamondBackground
        },
        [Ranks.MASTER]: {
            corner: masterCorner,
            background: masterBackground
        },
        [Ranks.GRANDMASTER]: {
            corner: grandmasterCorner,
            background: grandmasterBackground
        },
        [Ranks.CHALLENGER]: {
            corner: challengerCorner,
            background: challengerBackground
        },
    }[rank];

    const mapImg = {
        [Maps.CLASSIC]: classicMap,
        [Maps.ARAM]: aramMap,
        [Maps.CHERRY]: cherryMap,
    }[map] ?? undefined;

    const handleCardClick = () => {
        if (challenges.data) {
            const challenge = challenges.data.find((challenge) => challenge.id === id);
            console.log(challenge);
            
        }
    }

    useEffect(() => {
        if (thresholds) {
            const filteredInput = Object.fromEntries(
                Object.entries(thresholds).filter(([key]) => !["GRANDMASTER", "CHALLENGER"].includes(key))
            );
            const maxVal = Math.max(...Object.values(filteredInput).map(({ value }) => value));
            setMaxValue(maxVal);
            const transformed = Object.fromEntries(
                Object.entries(filteredInput).map(([key, { value }]) => [
                    key,
                    {
                        value,
                        percentage: parseFloat(((value / maxVal) * 100).toFixed(2))
                    }
                ])
            );
            setFilteredThresholds(transformed);
        }
    }, [thresholds])

    return (
        <article className='relative inline-block py-4 pl-8 pr-4 pt-2 z-0 border border-zinc-700' onClick={() => handleCardClick()}>
            <img src={imgs.background} alt="challenge background" className='absolute object-cover w-full h-full left-0 top-0 opacity-50 -z-10' />
            <div className='absolute left-0 top-0'>
                <img src={imgs.corner} alt="challenge image" className='size-[58px]' loading="lazy" />
                {/* @todo base capstone progress on : https://127.0.0.1:63574/lol-challenges/v1/level-points */}
                <span className='absolute left-0 top-2 font-medium text-center w-7'>{capstoneProgress}</span>
            </div>
            <div className='flex justify-end'>
                <div className="size-5">
                    {mapImg && <img src={mapImg} alt="map type" className="w-full" loading="lazy" />}
                </div>
            </div>
            <div className='flex items-start gap-4 h-full'>
                <div className='size-16 flex-none'>
                    <img src={`https://raw.communitydragon.org/14.23/game/assets/challenges/config/${id}/tokens/${rank.toLocaleLowerCase()}.png`} loading="lazy" />
                </div>
                <div className="flex-grow">
                    <h1 className='font-bold'>{title}</h1>
                    <p className='text-sm text-zinc-400 mb-2 min-h-10 line-clamp-2'>{description}</p>
                    {overallProgressMode &&
                        <ProgressBar value={currentValue / maxValue * 100}>{finished ? "Completed" : `${currentValue}/${maxValue}`}</ProgressBar>
                    }
                    {!overallProgressMode &&
                        <ProgressBar value={progress}>{finished ? "Completed" : progressIndictor}</ProgressBar>
                    }

                    {filteredThresholds && !finished && overallProgressMode &&
                        <ProgressTicks ticks={Object.values(filteredThresholds).map((value) => ({
                            percentage: value.percentage,
                            element: <div className='text-xs rotate-45 relative top-1'>{value.value}</div>
                        }))}
                        />
                    }
                </div>
            </div>
        </article>
    )
}

