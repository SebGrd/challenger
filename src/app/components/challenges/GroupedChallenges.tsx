import { LolChallengesUIChallengeWithChildren, useStore } from "@/context/StoreContext";
import { LolChallengesUIChallenge } from "@hasagi/core/types/lcu-types";
import { useMemo } from "react";
import { ProgressBar } from "../statistics/ProgressBar";
import { cn } from "@/lib/utils";

type GroupedChallengesProps = {
    parentId: number,
}

export default function GroupedChallenges({ parentId }: GroupedChallengesProps) {
    const { groupedChallenges: allGroupedChallenges } = useStore();

    const groupedChallenges = useMemo(() => {
        if (!allGroupedChallenges.isSuccess) return null;
        const groupedChallenges = allGroupedChallenges.data;
        // Since allGroupedChallenges.data is tree like object, we need to recursively find the children with the id of parentId*
        function findChildren(challenges: any, parentId: number): LolChallengesUIChallengeWithChildren | null {
            if (challenges[parentId]) {
                return challenges[parentId];
            }
            for (const key in challenges) {
                if (challenges[key].children) {
                    const result = findChildren(challenges[key].children, parentId);
                    if (result) {
                        return result;
                    }
                }
            }
            return null;
        }
        console.log(findChildren(groupedChallenges, parentId));

        return findChildren(groupedChallenges, parentId);
    }, [allGroupedChallenges])

    // A recursive function that generates elements for the tree so the children are inside the parent etc.
    function generateTree(groupedChallenges: LolChallengesUIChallengeWithChildren, depth = 0) {
        if (!groupedChallenges || !groupedChallenges.children) return;
        if (Object.keys(groupedChallenges.children).length === 0) return;
        // Increment depth
        depth++;
        return (
            <div className={cn(
                { 'grid grid-cols-3 gap-2': depth === 3 },
            )}>
                {Object.values(groupedChallenges.children).map((challenge: LolChallengesUIChallenge) => (
                    <div key={challenge.id} className={cn(
                        "border border-zinc-700 p-4 mb-8",
                        { 'bg-zinc-950': depth === 1 },
                        { 'bg-zinc-900': depth === 2 },
                        { 'bg-zinc-950 mb-0': depth === 3 },
                    )}>
                        <div className="flex items-center gap-4">
                            <div className='size-10 flex-none'>
                                <img src={`https://raw.communitydragon.org/14.23/game/assets/challenges/config/${challenge.id}/tokens/${challenge.currentLevel.toLocaleLowerCase()}.png`} loading="lazy" />
                            </div>
                            <h1 className="text-xl font-medium">{challenge.name}</h1>
                        </div>
                        <p className="text-zinc-500">{challenge.description}</p>
                        <ProgressBar value={challenge.currentValue / challenge.nextThreshold * 100}>
                            {(challenge.currentThreshold === 0) ? "Completed" : `${challenge.currentValue}/${challenge.nextThreshold}`}
                        </ProgressBar>
                        <div className="my-4"></div>
                        {generateTree(challenge, depth)}
                    </div>
                ))}
            </div>
        )
    }

    return (
        <section>
            {groupedChallenges && generateTree(groupedChallenges)}
        </section>
    )
}