import { SummonerProfile } from "@/types/lol";
import { authenticate, createHttp1Request } from "league-connect";


async function lcuHttpGetRequest(url: string) {
    const credentials = await authenticate();
    const res = await createHttp1Request(
        {
            method: "GET",
            url: url,
        },
        credentials
    );
    return res.json();
}

export async function getSummoner(): Promise<any> {
    return await lcuHttpGetRequest("/lol-chat/v1/me");
}
export async function getSummonerProfile(): Promise<SummonerProfile> {
    try {
        const data = await lcuHttpGetRequest("/lol-summoner/v1/current-summoner/summoner-profile");
        return {
            backgroundSkinAugments: data.backgroundSkinAugments,
            backgroundSkinId: data.backgroundSkinId,
            equippedBannerFlag: JSON.parse(data.equippedBannerFlag as string),
            regalia: JSON.parse(data.regalia as string),
        } as SummonerProfile;
    } catch (error) {
        throw new Error('Error while fetching profile data');
    }
   
}

export async function getChallengeSummary(): Promise<any> {
    return await lcuHttpGetRequest("/lol-challenges/v1/summary-player-data/local-player");
}


export async function getChallenges(): Promise<any> {
    return await lcuHttpGetRequest("/lol-challenges/v1/challenges/local-player");
}

export async function getChallengesCategories(): Promise<any> {
    return await lcuHttpGetRequest("/lol-challenges/v1/challenges/category-data");
}


export async function getAllTitles(): Promise<any> {
    return await lcuHttpGetRequest("/lol-challenges/v2/titles/all");
}
export async function getAsset(url: string): Promise<any> {
    const credentials = await authenticate();
    const res = await createHttp1Request(
        {
            method: "GET",
            url: url,
        },
        credentials
    );
    return res.buffer();
}