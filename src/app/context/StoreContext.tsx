import { createContext, useContext } from "react";
import { getAllChallenges, getAllChallengesSummary, getChallengesCategories } from "../queries/queries";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { LolChallengesUIChallenge, LolChallengesUIPlayerSummary } from "@hasagi/core/types/lcu-types";

type LolChallengesUIChallengeGroup = {
    [key: number]: LolChallengesUIChallenge;
}

interface LegacyGroupedChallenges {
    [key: number]: {
        children: LolChallengesUIChallengeGroup
    }
}
export interface LolChallengesUIChallengeWithChildren extends LolChallengesUIChallenge {
    children?: LolChallengesUIChallengeGroup;
}

type StoreContextType = {
    [key: string]: UseQueryResult<any, unknown>;
    challenges: UseQueryResult<LolChallengesUIChallenge[], unknown>;
    challengesSummary: UseQueryResult<LolChallengesUIPlayerSummary, unknown>;
    challengesCategories: UseQueryResult<{ [key: number]: LolChallengesUIChallenge }, unknown>;
    groupedChallenges: UseQueryResult<{ [key: string]: LolChallengesUIChallengeWithChildren | LegacyGroupedChallenges }, unknown>;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error("useStore must be used within a StoreProvider");
    }
    return context;
}


export default function StoreProvider({ children }: { children: React.ReactNode }) {
    const challenges = useQuery({ queryKey: ['challenges'], queryFn: getAllChallenges });
    const challengesSummary = useQuery({ queryKey: ['challengesSummary'], queryFn: getAllChallengesSummary, retry: true, retryDelay: 2000 });
    const challengesCategories = useQuery({ queryKey: ['challengesCategories'], queryFn: getChallengesCategories });
    const groupedChallenges = useQuery({
        queryKey: ['groupedChallenges'],
        queryFn: async () => {
            if (!challengesCategories.data || !challenges.data) {
                return null;
            }
            const categoriesFlatten = Object.values(challengesCategories.data);
            const allChallenges = [...categoriesFlatten, ...challenges.data];

            function groupAllChallenges(challenges: LolChallengesUIChallenge[]) {

                // Grouping non legacy challenges into a parentId relation tree
                const recursiveGroup = (challenges: LolChallengesUIChallenge[], firstParentId: number) => {
                    const result: { [key: number]: LolChallengesUIChallengeWithChildren } = {};
                    challenges.forEach(challenge => {
                        if (challenge.category === "LEGACY") {
                            return;
                        }
                        if (challenge.parentId === firstParentId) {
                            result[challenge.id] = challenge;
                            result[challenge.id].children = recursiveGroup(challenges, challenge.id);
                        }
                    });
                    return result;
                }
                // Grouping legacy challenges into a capstoneGroupId relation
                const groupLegacy = (challenges: LolChallengesUIChallenge[]) => {
                    const result: LegacyGroupedChallenges = {};
                    challenges.forEach(challenge => {
                        const group = result[challenge.capstoneGroupId] || { children: {} };
                        if (challenge.capstoneGroupId === challenge.id) {
                            return result[challenge.capstoneGroupId] = { ...group, ...challenge };
                        }
                        group.children[challenge.id] = challenge;
                        result[challenge.capstoneGroupId] = group;
                    });
                    return result;
                }

                return {
                    ...recursiveGroup(challenges, -1),
                    legacy: groupLegacy(challenges.filter(challenge => challenge.category === "LEGACY")),
                }
            }

            return groupAllChallenges(allChallenges);
        },
        enabled: !!challenges.isSuccess && !!challengesCategories.isSuccess,
    })

    const store: StoreContextType = {
        challenges: challenges,
        challengesSummary: challengesSummary,
        challengesCategories: challengesCategories,
        groupedChallenges: groupedChallenges,
    };
    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
}