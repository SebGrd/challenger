import { CrestType } from "@/components/profile/Crest";


export enum Categories {
    EXPERTISE = 'EXPERTISE',
    TEAMWORK = 'TEAMWORK',
    IMAGINATION = 'IMAGINATION',
    VETERANCY = 'VETERANCY',
    COLLECTION = 'COLLECTION',
}

export enum Ranks {
    IRON = 'IRON',
    BRONZE = 'BRONZE',
    SILVER = 'SILVER',
    GOLD = 'GOLD',
    PLATINUM = 'PLATINUM',
    EMERALD = 'EMERALD',
    DIAMOND = 'DIAMOND',
    MASTER = 'MASTER',
    GRANDMASTER = 'GRANDMASTER',
    CHALLENGER = 'CHALLENGER',
}

export enum Tiers {
    NONE = 'NONE',
    IRON = 'IRON',
    BRONZE = 'BRONZE',
    SILVER = 'SILVER',
    GOLD = 'GOLD',
    PLATINUM = 'PLATINUM',
    DIAMOND = 'DIAMOND',
    MASTER = 'MASTER',
    GRANDMASTER = 'GRANDMASTER',
    CHALLENGER = 'CHALLENGER',
}


export enum Maps {
    ARAM = 'ARAM',
    CLASSIC = 'CLASSIC',
    CHERRY = 'CHERRY',
}


export interface SummonerProfile {
    backgroundSkinAugments: string,
    backgroundSkinId: number,
    equippedBannerFlag: {
        itemId: number,
        level: number,
        seasonId: number,
        theme: string,
    },
    regalia: {
        bannerType: number,
        crestType: CrestType,
        selectedPrestigeCrest: number,
    }
}