import crest1 from '@/images/crests/prestige/prestige_crest_lvl_001.png';
import crest2 from '@/images/crests/prestige/prestige_crest_lvl_030.png';
import crest3 from '@/images/crests/prestige/prestige_crest_lvl_050.png';
import crest4 from '@/images/crests/prestige/prestige_crest_lvl_075.png';
import crest5 from '@/images/crests/prestige/prestige_crest_lvl_100.png';
import crest6 from '@/images/crests/prestige/prestige_crest_lvl_125.png';
import crest7 from '@/images/crests/prestige/prestige_crest_lvl_150.png';
import crest8 from '@/images/crests/prestige/prestige_crest_lvl_175.png';
import crest9 from '@/images/crests/prestige/prestige_crest_lvl_200.png';
import crest10 from '@/images/crests/prestige/prestige_crest_lvl_225.png'; 
import crest11 from '@/images/crests/prestige/prestige_crest_lvl_250.png';
import crest12 from '@/images/crests/prestige/prestige_crest_lvl_275.png';
import crest13 from '@/images/crests/prestige/prestige_crest_lvl_300.png';
import crest14 from '@/images/crests/prestige/prestige_crest_lvl_325.png';
import crest15 from '@/images/crests/prestige/prestige_crest_lvl_350.png';
import crest16 from '@/images/crests/prestige/prestige_crest_lvl_375.png';
import crest17 from '@/images/crests/prestige/prestige_crest_lvl_400.png';
import crest18 from '@/images/crests/prestige/prestige_crest_lvl_425.png';
import crest19 from '@/images/crests/prestige/prestige_crest_lvl_450.png';
import crest20 from '@/images/crests/prestige/prestige_crest_lvl_475.png';
import crest21 from '@/images/crests/prestige/prestige_crest_lvl_500.png';

import ironCrest from '@/images/crests/ranked/iron_base.png';
import bronzeCrest from '@/images/crests/ranked/bronze_base.png';
import silverCrest from '@/images/crests/ranked/silver_base.png';
import goldCrest from '@/images/crests/ranked/gold_base.png';
import platinumCrest from '@/images/crests/ranked/platinum_base.png';
import emeraldCrest from '@/images/crests/ranked/emerald_base.png';
import diamondCrest from '@/images/crests/ranked/diamond_base.png';
import masterCrest from '@/images/crests/ranked/master_base.png';
import grandmasterCrest from '@/images/crests/ranked/grandmaster_base.png';
import challengerCrest from '@/images/crests/ranked/challenger_base.png';
import { Ranks } from '@/../types/lol';

export enum CrestType {
    PRESTIGE = 1,
    RANKED = 2,
}

export enum PrestigeCrest {
    LVL_1 = 1,
    LVL_30 = 2,
    LVL_50 = 3,
    LVL_75 = 4,
    LVL_100 = 5,
    LVL_125 = 6,
    LVL_150 = 7,
    LVL_175 = 8,
    LVL_200 = 9,
    LVL_225 = 10,
    LVL_250 = 11,
    LVL_275 = 12,
    LVL_300 = 13,
    LVL_325 = 14,
    LVL_350 = 15,
    LVL_375 = 16,
    LVL_400 = 17,
    LVL_425 = 18,
    LVL_450 = 19,
    LVL_475 = 20,
    LVL_500 = 21,
}


type CrestProps = {
    crestType: CrestType;
    selectedPrestigeCrest: PrestigeCrest;
    rankedTier?: Ranks;
}

export default function Crest({ crestType, selectedPrestigeCrest, rankedTier, ...rest }: CrestProps) {
    const crests = {
        '1': crest1,
        '2': crest2,
        '3': crest3,
        '4': crest4,
        '5': crest5,
        '6': crest6,
        '7': crest7,
        '8': crest8,
        '9': crest9,
        '10': crest10,
        '11': crest11,
        '12': crest12,
        '13': crest13,
        '14': crest14,
        '15': crest15,
        '16': crest16,
        '17': crest17,
        '18': crest18,
        '19': crest19,
        '20': crest20,
        '21': crest21,
        [Ranks.IRON]: ironCrest,
        [Ranks.BRONZE]: bronzeCrest,
        [Ranks.SILVER]: silverCrest,
        [Ranks.GOLD]: goldCrest,
        [Ranks.PLATINUM]: platinumCrest,
        [Ranks.EMERALD]: emeraldCrest,
        [Ranks.DIAMOND]: diamondCrest,
        [Ranks.MASTER]: masterCrest,
        [Ranks.GRANDMASTER]: grandmasterCrest,
        [Ranks.CHALLENGER]: challengerCrest,
    }

    const selectedCrest = crestType === CrestType.PRESTIGE ? selectedPrestigeCrest : (rankedTier ?? Ranks.IRON);

    return (
        <img src={crests[selectedCrest]} alt="Crest" {...rest}  />
    )
}