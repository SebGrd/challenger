import { createFileRoute } from '@tanstack/react-router'
import ChallengesNavbar from '../../components/challenges/ChallengesNavbar';
import { useCategory } from '@/hooks/useCategory';
import { ProgressBar } from '@/components/statistics/ProgressBar';
import { useMemo } from 'react';
import { useCategoryChallenges } from '@/hooks/useCategoryChallenges';
import { useStore } from '@/context/StoreContext';
import ChallengeCard from '@/components/challenges/ChallengeCard';
import GroupedChallenges from '@/components/challenges/GroupedChallenges';

export const Route = createFileRoute('/challenges/$challengeGroup')({
    component: Index,
})

function Index() {
    const { challengeGroup } = Route.useParams();
    const { challenges: allChallenges } = useStore();
    const category = useCategory(parseInt(challengeGroup));
    const challenges = useMemo(
        () => allChallenges.isSuccess && allChallenges.data.filter((c) => c.category === category?.name),
        [category]
    );

    console.log(challenges);


    const overallPercentage = useMemo(() => {
        if (category) {
            return ((category.currentValue - category.currentThreshold) / (category.nextThreshold - category.currentThreshold)) * 100
        }
    }, [category])

    return (
        <div>
            <ChallengesNavbar />
            {category && <>
                <h1 className='text-2xl'>{category.name}</h1>
                <section className='px-4 mb-6'>
                    <ProgressBar value={overallPercentage} className='h-8'>
                        <span className='text-lg'>{category.currentValue}/{category.nextThreshold}</span>
                    </ProgressBar>
                </section>
                {/* <section className='grid grid-cols-3 gap-4 px-4'>
                    {challenges && challenges.map(challenge => (
                        <ChallengeCard
                            key={challenge.id}
                            id={challenge.id}
                            rank={challenge.currentLevel as Exclude<Ranks, Ranks.EMERALD>}
                            map={challenge.gameModes[0] as Maps}
                            title={challenge.name}
                            description={challenge.descriptionShort}
                            capstoneProgress={challenge.thresholds[challenge.currentLevel]?.rewards[0].quantity}
                            progress={challenge.currentValue / challenge.nextThreshold * 100}
                            // progressIndictor={`${challenge.currentValue}/${challenge.nextThreshold}`}
                            progressIndictor={`${challenge.currentValue}/${challenge.nextThreshold}`}
                            finished={challenge.currentThreshold === 0}
                            thresholds={challenge.thresholds}
                            currentValue={challenge.currentValue}
                            active
                            overallProgressMode={false}
                        />
                    ))}
                </section> */}

                <section className='mx-4'>
                    <GroupedChallenges parentId={category.id} />
                </section>
            </>}

        </div>
    )
}
