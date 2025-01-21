import { createFileRoute } from '@tanstack/react-router'
import ChallengesNavbar from '../../components/challenges/ChallengesNavbar'
import { useStore } from '@/context/StoreContext'

import ChallengeCard from '@/components/challenges/ChallengeCard';
import { Maps, Ranks, Tiers } from '@/../types/lol';
import { Suspense, useEffect, useMemo, useState } from 'react';
import ChallengesTokens from '@/components/challenges/ChallengesTokens';
import { Input } from '@/components/ui/Input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/ToggleGroup';
import { ChallengeLogo, IconPeople, MapAram, MapCherry, MapClassic } from '@/components/ui/svgs';
import { Switch } from '@/components/ui/Switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { Label } from '@/components/ui/Label';
import { ProgressBar } from '@/components/statistics/ProgressBar';
import ChallengesCrystals from '@/components/challenges/ChallengesCrystal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/Collapsible';
import { Button } from '@/components/ui/Button';
import { ChevronsUpDown, Filter } from 'lucide-react';


enum CompletedMode {
  SHOW_ALL = 'SHOW_ALL',
  HIDE_COMPLETED = 'HIDE_COMPLETED',
  HIDE_COMPLETED_LEADERBOARD = 'HIDE_COMPLETED_LEADERBOARD',
}

export const Route = createFileRoute('/challenges/')({
  component: Index,
})

function Index() {
  const { challenges, challengesCategories } = useStore()

  const [overallProgressMode, setOverallProgressMode] = useState(false)

  const [selectedMaps, setSelectedMaps] = useState<Maps[]>([])

  const [nbRanks, setNbRanks] = useState({
    [Tiers.NONE]: 0,
    [Tiers.IRON]: 0,
    [Tiers.BRONZE]: 0,
    [Tiers.SILVER]: 0,
    [Tiers.GOLD]: 0,
    [Tiers.PLATINUM]: 0,
    [Tiers.DIAMOND]: 0,
    [Tiers.MASTER]: 0,
    [Tiers.GRANDMASTER]: 0,
    [Tiers.CHALLENGER]: 0,
  })

  const [completedMode, setCompletedMode] = useState<CompletedMode>(CompletedMode.SHOW_ALL)

  const [hideLegacy, setHideLegacy] = useState(false)

  const [isCapstone, setIsCapstone] = useState(false)

  const [search, setSearch] = useState('')

  const [filteredChallenges, setFilteredChallenges] = useState(challenges.data);
  const [sortedChallenges, setSortedChallenges] = useState(filteredChallenges);

  const [sortingStrategy, setSortingStrategy] = useState({
    strategy: 'default',
    ascending: true,
  })


  useEffect(() => {
    if (challenges.data) {
      setFilteredChallenges(challenges.data.filter((challenge) => {
        if (selectedMaps.length > 0 && !selectedMaps.includes(challenge.gameModes[0] as Maps)) {
          return false;
        }
        if (hideLegacy && challenge.category === "LEGACY") {
          return false;
        }
        if (completedMode === 'HIDE_COMPLETED' && challenge.currentThreshold === 0) {
          return false;
        }
        if (completedMode === 'HIDE_COMPLETED_LEADERBOARD' && challenge.hasLeaderboard && challenge.currentValue >= challenge.thresholds["MASTER"]?.value || (challenge.currentThreshold === 0 && completedMode === 'HIDE_COMPLETED_LEADERBOARD')) {
          return false;
        }
        if (challenge.isCapstone === isCapstone) {
          return false;
        }
        if (search.length > 0 && !challenge.name.toLowerCase().includes(search.toLowerCase()) && !challenge.descriptionShort.toLowerCase().includes(search.toLowerCase())) {
          return false;
        }
        // https://127.0.0.1:54021/lol-game-data/assets/v1/challenges.json @todo
        return true;
      }))
    }
  }, [selectedMaps, hideLegacy, search, completedMode, isCapstone])

  useEffect(() => {
    if (filteredChallenges) {
      const nbRanks = {
        [Tiers.NONE]: 0,
        [Tiers.IRON]: 0,
        [Tiers.BRONZE]: 0,
        [Tiers.SILVER]: 0,
        [Tiers.GOLD]: 0,
        [Tiers.PLATINUM]: 0,
        [Tiers.DIAMOND]: 0,
        [Tiers.MASTER]: 0,
        [Tiers.GRANDMASTER]: 0,
        [Tiers.CHALLENGER]: 0,
      }
      filteredChallenges.forEach((challenge) => {
        nbRanks[challenge.currentLevel as Exclude<Ranks, Ranks.EMERALD>]++
      })
      setNbRanks(nbRanks)
    }
  }, [filteredChallenges])

  useEffect(() => {
    if (filteredChallenges) {
      console.log('sorting', sortingStrategy)
      const filtered = filteredChallenges.sort((a, b) => {
        if (sortingStrategy.strategy === 'default') {
          return 0;
        }
        if (sortingStrategy.strategy === 'progressPercentage') {
          return b.currentValue / b.nextThreshold - a.currentValue / a.nextThreshold;
        }
        if (sortingStrategy.strategy === 'name') {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
      setSortedChallenges(filtered)
    }
  }, [sortingStrategy, filteredChallenges])

  const overallPercentage = useMemo(() => {
    if (challengesCategories.isSuccess) {
      const all = challengesCategories.data[0]
      return ((all.currentValue - all.currentThreshold) / (all.nextThreshold - all.currentThreshold)) * 100
    }
  }, [challengesCategories])

  return (
    <div>
      <ChallengesNavbar />
      <section className='flex justify-between px-4 mb-4 items-end'>
        <div className='flex items-center gap-4'>
          <div className='relative z-0'>
            <div className='absolute size-24 bg-rank-platinum rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3 -z-10 blur-lg opacity-40'></div>
            <ChallengeLogo className='size-32 fill-rank-platinum' />
          </div>
          <div className=''>
            <h3 className="text-3xl font-medium">All Challenges <span className='text-sm text-zinc-400'>({filteredChallenges?.length})</span></h3>
            {challengesCategories.isSuccess && (
              <>
                <div className='flex items-center gap-2'>
                  <div className='size-12'>
                    <ChallengesCrystals
                      rank={challengesCategories.data[0].currentLevel as Exclude<Ranks, Ranks.EMERALD>}
                    />
                  </div>
                  <p className='text-lg'>{challengesCategories.data[0].currentLevel}</p>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='w-12 flex justify-center'>
                    <IconPeople className='size-6 fill-zinc-600' />
                  </div>
                  <p className='text-sm text-zinc-400'>Top {Math.round(challengesCategories.data[0].percentile * 10) / 10}%</p>
                </div>
              </>
            )}
          </div>
        </div>
        <div className='mb-1.5'>
          <ChallengesTokens
            nbNone={nbRanks[Tiers.NONE]}
            nbIron={nbRanks[Tiers.IRON]}
            nbBronze={nbRanks[Tiers.BRONZE]}
            nbSilver={nbRanks[Tiers.SILVER]}
            nbGold={nbRanks[Tiers.GOLD]}
            nbPlatinum={nbRanks[Tiers.PLATINUM]}
            nbDiamond={nbRanks[Tiers.DIAMOND]}
            nbMaster={nbRanks[Tiers.MASTER]}
            nbGrandmaster={nbRanks[Tiers.GRANDMASTER]}
            nbChallenger={nbRanks[Tiers.CHALLENGER]}
          />
        </div>
      </section>
      <section className='px-4 mb-6'>
        {challengesCategories.isSuccess && (
          <ProgressBar value={overallPercentage} className='h-8'>
            <span className='text-lg'>{challengesCategories.data[0].currentValue}/{challengesCategories.data[0].nextThreshold}</span>
          </ProgressBar>
        )}
      </section>
      <section className='flex items-start px-4 gap-2'>
        <div>
          <Input
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search...'
          />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Group</SelectItem>
            <SelectItem value="dark">Rarity (Top%)</SelectItem>
            <SelectItem value="system">Tier</SelectItem>
          </SelectContent>
        </Select>
        <ToggleGroup type='multiple' value={selectedMaps} onValueChange={(value: Maps[]) => setSelectedMaps(value)} loop>
          <ToggleGroupItem value={Maps.CLASSIC} aria-label='toggle aram' variant="outline">
            <MapClassic className='fill-white' />
          </ToggleGroupItem>
          <ToggleGroupItem value={Maps.ARAM} aria-label='toggle aram' variant="outline">
            <MapAram className='fill-white' />
          </ToggleGroupItem>
          <ToggleGroupItem value={Maps.CHERRY} aria-label='toggle aram' variant="outline">
            <MapCherry className='fill-white' />
          </ToggleGroupItem>
        </ToggleGroup>
        <RadioGroup value={completedMode} onValueChange={(value: CompletedMode) => setCompletedMode(value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={CompletedMode.SHOW_ALL} id="showAll" />
            <Label htmlFor="showAll">Show all</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={CompletedMode.HIDE_COMPLETED} id="completedMode" />
            <Label htmlFor="completedMode">Hide completed</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={CompletedMode.HIDE_COMPLETED_LEADERBOARD} id="hideLeaderboard" />
            <Label htmlFor="hideLeaderboard">Hide leaderboards</Label>
          </div>
        </RadioGroup>
        <div className='flex flex-shrink-0'>
          <label htmlFor="isCapstone" className='flex flex-col'>
            <span className='text-sm'>isCapstone</span>
          </label>
          <Switch id="isCapstone" checked={isCapstone} onCheckedChange={() => setIsCapstone(!isCapstone)} />
        </div>
        <div className='flex flex-shrink-0'>
          <label htmlFor="hideLegacy" className='flex flex-col'>
            <span className='text-sm'>Hide retired</span>
            <span className='text-xs text-zinc-400'>(Retired only)</span>
          </label>
          <Switch id="hideLegacy" checked={hideLegacy} onCheckedChange={() => setHideLegacy(!hideLegacy)} />
        </div>
        <ToggleGroup
          type='single'
          value={sortingStrategy.strategy}
          onValueChange={(value: string) => setSortingStrategy({ ...sortingStrategy, strategy: value })}
        >
          <ToggleGroupItem value="name" aria-label='toggle aram' variant="outline">
            N
          </ToggleGroupItem>
          <ToggleGroupItem value="progressPercentage" aria-label='toggle aram' variant="outline">
            P
          </ToggleGroupItem>
          <ToggleGroupItem value="default" aria-label='toggle aram' variant="outline">
            D
          </ToggleGroupItem>
        </ToggleGroup>
        <div className='flex'>
          <label htmlFor="overallProgressMode" className='flex flex-col'>
            <span className='text-sm'>Progress mode</span>
            <span className='text-xs text-zinc-400'>(challenges thresholds)</span>
          </label>
          <Switch id="overallProgressMode" checked={overallProgressMode} onCheckedChange={() => setOverallProgressMode(!overallProgressMode)} />
        </div>
      </section>

      <section>
        <Collapsible>
          <CollapsibleTrigger>
            <Filter className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <section className='p-4 flex gap-4'>
              <div className='inline-block border p-4'>
                <div className='flex justify-between gap-6 mb-4'>
                  <div>
                    <p className='text-md'>Completion</p>
                    <p className='text-xs text-zinc-400 max-w-48'>Challenges completed, running leaderboard, ...</p>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <label htmlFor="hideLegacy" className='text-sm'>
                      Hide all
                    </label>
                    <Switch id="hideLegacy" checked={hideLegacy} onCheckedChange={() => setHideLegacy(!hideLegacy)} />
                  </div>
                </div>
                <div className='flex justify-between items-center border p-4 bg-zinc-900 mb-4'>
                  <label htmlFor="hideLegacy" className='flex flex-col'>
                    <span className='text-sm'>Hide completed</span>
                  </label>
                  <Switch id="hideLegacy" checked={hideLegacy} onCheckedChange={() => setHideLegacy(!hideLegacy)} />
                </div>
                <div className='flex justify-between items-center border p-4 bg-zinc-900'>
                  <label htmlFor="hideLegacy" className='flex flex-col'>
                    <span className='text-sm'>Hide running leaderboard</span>
                    <span className='text-xs text-zinc-400'>(Only to Master tier)</span>
                  </label>
                  <Switch id="hideLegacy" checked={hideLegacy} onCheckedChange={() => setHideLegacy(!hideLegacy)} />
                </div>
              </div>
              <div className='inline-block border p-4'>
                <div className='flex justify-between gap-6 mb-4'>
                  <div>
                    <p className='text-md'>Legacy</p>
                    <p className='text-xs text-zinc-400 max-w-48'>Split season, retired, gamemode, ...</p>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <label htmlFor="hideLegacy" className='text-sm'>
                      Hide all
                    </label>
                    <Switch id="hideLegacy" checked={hideLegacy} onCheckedChange={() => setHideLegacy(!hideLegacy)} />
                  </div>
                </div>
                <div className='flex justify-between items-center border p-4 bg-zinc-900 mb-4'>
                  <label htmlFor="hideLegacy" className='flex flex-col'>
                    <span className='text-sm'>Hide retired</span>
                  </label>
                  <Switch id="hideLegacy" checked={hideLegacy} onCheckedChange={() => setHideLegacy(!hideLegacy)} />
                </div>
                <div className='flex justify-between items-center border p-4 bg-zinc-900'>
                  <label htmlFor="hideLegacy" className='flex flex-col'>
                    <span className='text-sm'>Hide seasonal</span>
                  </label>
                  <Switch id="hideLegacy" checked={hideLegacy} onCheckedChange={() => setHideLegacy(!hideLegacy)} />
                </div>
              </div>
            </section>

          </CollapsibleContent>
        </Collapsible>
      </section>


      {challenges.isLoading && <p>Loading...</p>}
      {challenges.isSuccess && (
        <section className='grid grid-cols-3 gap-4 px-4'>
          {challenges.data.length > 0 && sortedChallenges && sortedChallenges.map((challenge) => (
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
              overallProgressMode={overallProgressMode}
            />
          ))}
        </section>
      )}
    </div>
  )
}
