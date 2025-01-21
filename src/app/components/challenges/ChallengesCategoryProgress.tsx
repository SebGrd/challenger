import { LolChallengesUICategoryProgress } from "@hasagi/core/types/lcu-types";
import { ProgressBar } from "../statistics/ProgressBar";
import { useEffect, useState } from "react";

import {
    CategoryExpertise,
    CategoryVeterancy,
    CategoryTeamwork,
    CategoryCollection,
    CategoryImagination,
    CategoryLegacy
} from "../ui/svgs";
import { cn } from "@/lib/utils";

interface Categories {
    [key: string]: LolChallengesUICategoryProgress;
}


export default function ChallengesCategoryProgress(
    { categoryProgress, }: {
        categoryProgress: LolChallengesUICategoryProgress[];
    }) {
    const [categories, setCategories] = useState<Categories>({});
    useEffect(() => {
        const cats: Categories = {};
        categoryProgress.forEach((cat) => cats[cat.category] = cat);
        setCategories(cats);
    }, [categoryProgress]);
    if (Object.keys(categories).length < 1) return null;
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
                <div>
                    <CategoryExpertise className={cn(
                        "size-7",
                        `fill-rank-${categories.EXPERTISE.level.toLowerCase()}`
                    )} />
                </div>
                <div className="flex-grow">
                    <p className="text-sm text-zinc-300 mb-1">Expertise</p>
                    <ProgressBar
                        value={categories.EXPERTISE.current / categories.EXPERTISE.max * 100}
                        indicatorClassName="bg-rank-gold"
                        className="h-3"
                    />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div>
                    {/* usinc cn() with those options once works. shit hack but it works. */}
                    <CategoryTeamwork className={cn(
                        "size-7",
                        {
                            'fill-rank-iron': categories.TEAMWORK.level === 'IRON',
                            'fill-rank-bronze': categories.TEAMWORK.level === 'BRONZE',
                            'fill-rank-silver': categories.TEAMWORK.level === 'SILVER',
                            'fill-rank-gold': categories.TEAMWORK.level === 'GOLD',
                            'fill-rank-platinum': categories.TEAMWORK.level === 'PLATINUM',
                            'fill-rank-diamond': categories.TEAMWORK.level === 'DIAMOND',
                            'fill-rank-master': categories.TEAMWORK.level === 'MASTER',
                            'fill-rank-grandmaster': categories.TEAMWORK.level === 'GRANDMASTER',
                            'fill-rank-challenger': categories.TEAMWORK.level === 'CHALLENGER',
                        }
                    )} />
                </div>
                <div className="flex-grow">
                    <p className="text-sm text-zinc-300 mb-1">Teamwork</p>
                    <ProgressBar value={categories.TEAMWORK.current / categories.TEAMWORK.max * 100}
                        indicatorClassName="bg-rank-gold"
                        className="h-3"
                    />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div>
                    <CategoryImagination className={cn(
                        "size-7",
                        `fill-rank-${categories.IMAGINATION.level.toLowerCase()}`
                    )} />
                </div>
                <div className="flex-grow">
                    <p className="text-sm text-zinc-300 mb-1">Imagination</p>
                    <ProgressBar value={categories.IMAGINATION.current / categories.IMAGINATION.max * 100}
                        indicatorClassName="bg-rank-diamond"
                        className="h-3"
                    />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div>
                    <CategoryVeterancy className={cn(
                        "size-7",
                        `fill-rank-${categories.VETERANCY.level.toLowerCase()}`
                    )} />
                </div>
                <div className="flex-grow">
                    <p className="text-sm text-zinc-300 mb-1">Veterancy</p>
                    <ProgressBar value={categories.VETERANCY.current / categories.VETERANCY.max * 100}
                        indicatorClassName="bg-rank-platinum"
                        className="h-3"
                    />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div>
                    <CategoryCollection className={cn(
                        "size-7",
                        `fill-rank-${categories.COLLECTION.level.toLowerCase()}`
                    )} />
                </div>
                <div className="flex-grow">
                    <p className="text-sm text-zinc-300 mb-1">Collection</p>
                    <ProgressBar value={categories.COLLECTION.current / categories.COLLECTION.max * 100}
                        indicatorClassName="bg-rank-diamond"
                        className="h-3"
                    />
                </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
                <div>
                    <CategoryLegacy className="size-7 fill-zinc-700"/>
                </div>
                <div className="flex-grow">
                    <p className="text-sm text-zinc-300">Legacy</p>
                </div>
            </div>
        </div>
    )
}