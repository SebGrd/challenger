import { useStore } from "@/context/StoreContext";


export function useCategoryChallenges(category?: string) {
    if (!category) return [];
    const { challenges } = useStore();
    return challenges.data?.filter(challenge => challenge.category === category);
}