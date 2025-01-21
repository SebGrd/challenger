type ChallengesTokensProps = {
    nbNone?: number;
    nbIron?: number;
    nbBronze?: number;
    nbSilver?: number;
    nbGold?: number;
    nbPlatinum?: number;
    nbDiamond?: number;
    nbMaster?: number;
    nbGrandmaster?: number;
    nbChallenger?: number;
}

import noneToken from '@/images/icons/icon-token-none.png';
import ironToken from '@/images/icons/icon-token-iron.png';
import bronzeToken from '@/images/icons/icon-token-bronze.png';
import silverToken from '@/images/icons/icon-token-silver.png';
import goldToken from '@/images/icons/icon-token-gold.png';
import platinumToken from '@/images/icons/icon-token-platinum.png';
import diamondToken from '@/images/icons/icon-token-diamond.png';
import masterToken from '@/images/icons/icon-token-master.png';
import grandmasterToken from '@/images/icons/icon-token-grandmaster.png';
import challengerToken from '@/images/icons/icon-token-challenger.png';

export default function ChallengesTokens({
    nbNone = 0,
    nbIron = 0,
    nbBronze = 0,
    nbSilver = 0,
    nbGold = 0,
    nbPlatinum = 0,
    nbDiamond = 0,
    nbMaster = 0,
    nbGrandmaster = 0,
    nbChallenger = 0,
}: ChallengesTokensProps) {
    return (
        <div className='flex items-center gap-4'>
            {nbNone > 0 &&
                <div className='flex items-center gap-1'>
                    <img src={noneToken} alt="None token" className='size-8' />
                    <span>{nbNone}</span>
                </div>
            }
            {nbIron > 0 &&
                <div className='flex items-center gap-1'>
                    <img src={ironToken} alt="Iron token" className='size-8' />
                    <span>{nbIron}</span>
                </div>
            }
            {nbBronze > 0 &&
                <div className='flex items-center gap-1'>
                    <img src={bronzeToken} alt="Bronze token" className='size-8' />
                    <span>{nbBronze}</span>
                </div>
            }
            {nbSilver > 0 &&
                <div className='flex items-center gap-1'>
                    <img src={silverToken} alt="Silver token" className='size-8' />
                    <span>{nbSilver}</span>
                </div>
            }
            {nbGold > 0 &&
                <div className='flex items-center gap-1'>
                    <img src={goldToken} alt="Gold token" className='size-8' />
                    <span>{nbGold}</span>
                </div>
            }
            {nbPlatinum > 0 &&
                <div className='flex items-center gap-1'>
                    <img src={platinumToken} alt="Platinum token" className='size-8' />
                    <span>{nbPlatinum}</span>
                </div>
            }
            {nbDiamond > 0 &&
                <div className='flex items-center gap-1'>
                    <img src={diamondToken} alt="Diamond token" className='size-8' />
                    <span>{nbDiamond}</span>
                </div>
            }
            {nbMaster > 0 &&
                <div className='flex items-center gap-1'>
                    <img src={masterToken} alt="Master token" className='size-8' />
                    <span>{nbMaster}</span>
                </div>
            }
            {nbGrandmaster > 0 &&
                <div className='flex items-center gap-1'>
                    <img src={grandmasterToken} alt="Grandmaster token" className='size-8' />
                    <span>{nbGrandmaster}</span>
                </div>
            }
            {nbChallenger > 0 &&
                <div className='flex items-center gap-1'>
                    <img src={challengerToken} alt="Challenger token" className='size-8' />
                    <span>{nbChallenger}</span>
                </div>
            }

        </div>
    )
}