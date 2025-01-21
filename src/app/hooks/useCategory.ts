import { useStore } from "@/context/StoreContext";


export function useCategory(id: number) {
    const { challengesCategories } = useStore();
    return challengesCategories.data?.[id];
}