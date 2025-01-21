import ironCrystal from '@/images/icons/crystal_iron.png';
import bronzeCrystal from '@/images/icons/crystal_bronze.png';
import silverCrystal from '@/images/icons/crystal_silver.png';
import goldCrystal from '@/images/icons/crystal_gold.png';
import platinumCrystal from '@/images/icons/crystal_platinum.png';
import diamondCrystal from '@/images/icons/crystal_diamond.png';
import masterCrystal from '@/images/icons/crystal_master.png';
import grandmasterCrystal from '@/images/icons/crystal_grandmaster.png';
import challengerCrystal from '@/images/icons/crystal_challenger.png';
import { Ranks } from '@/../types/lol';


export default function ChallengesCrystals({rank, ...rest}: {rank: Exclude<Ranks, Ranks.EMERALD>}) {
    const crystals = {
        [Ranks.IRON]: ironCrystal,
        [Ranks.BRONZE]: bronzeCrystal,
        [Ranks.SILVER]: silverCrystal,
        [Ranks.GOLD]: goldCrystal,
        [Ranks.PLATINUM]: platinumCrystal,
        [Ranks.DIAMOND]: diamondCrystal,
        [Ranks.MASTER]: masterCrystal,
        [Ranks.GRANDMASTER]: grandmasterCrystal,
        [Ranks.CHALLENGER]: challengerCrystal,
    }
    return (
        <img src={crystals[rank]} alt={`${rank} crystal`} {...rest} />
    )
}