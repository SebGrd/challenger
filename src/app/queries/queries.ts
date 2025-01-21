import { LolChallengesUIChallenge, LolChallengesUIPlayerSummary } from "@hasagi/core/types/lcu-types";

export const getAllChallenges = async () => {
    try {
        const data = await window.lcuApi.getChallenges();
        return Object.values(data) as LolChallengesUIChallenge[];
    } catch (error) {
        throw new Error('Error while fetching: ' + getAllChallenges.name);
    }
};

export const getAllChallengesSummary = async () => {
    try {
        const response = await window.lcuApi.getChallengeSummary();
        return response as LolChallengesUIPlayerSummary;
    } catch (error) {
        console.error(error);
        throw new Error('Error while fetching: ' + getAllChallengesSummary.name);
    }
}

export const getChallengesCategories = async () => {
    try {
        const response = await window.lcuApi.getChallengesCategories();
        return response as {[key: number]:LolChallengesUIChallenge};
    } catch (error) {
        console.error(error);
        throw new Error('Error while fetching: ' + getChallengesCategories.name);
    }
}