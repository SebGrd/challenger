import { createLazyFileRoute } from '@tanstack/react-router'
import { useContext } from 'react'
import { InGameContext } from '../context/InGameContext'
import { LolChampSelectChampSelectSession } from '@hasagi/core/types/lcu-types'

import arenaSkybox from '@/images/arena_skybox.png';
import srSkybox from '@/images/sr_skybox.png';
import haSkybox from '@/images/ha_skybox.png';

import cherryGamemode from '@/images/icons/gamemode_cherry.png';
import srGamemode from '@/images/icons/gamemode_sr.png';
import haGamemode from '@/images/icons/gamemode_ha.png';
import useChampion from '@/hooks/useChampion';
import Bench from '@/components/champSelect/Bench';

export const Route = createLazyFileRoute('/live')({
  component: RouteComponent,
})

function RouteComponent() {
  const inGame = useContext(InGameContext);
  const champSelectData = inGame?.champSelectData as LolChampSelectChampSelectSession | undefined
  const { getName, getThumbnail } = useChampion();

  return (
    <div className='relative flex-grow'>
      <div className='absolute top-0 bottom-0 right-0 left-0 object-cover pointer-events-none'>
        <img src={haSkybox} alt="background" className='h-full w-full opacity-15' />
      </div>
      {champSelectData && (
        <div className='grid grid-cols-[1fr_auto]'>
          <section>
            <div className='grid grid-cols-3'>
              <img src={haGamemode} alt="Gamemode icon" className='size-24' />
              <div className='flex flex-col items-center'>
                <p>{champSelectData?.timer?.phase ?? '-'}</p>
                <p className='text-7xl font-medium'>
                  {champSelectData?.timer ? Math.round((champSelectData?.timer?.adjustedTimeLeftInPhase) / 1000) : '-'}
                </p>
                <Bench champions={champSelectData.benchChampions} />
              </div>
            </div>

            {}
            challenge.gameModes[0] as Maps

            <div>
              <h2>My Team</h2>
              <code>
                <pre>
                  {champSelectData.myTeam && champSelectData.myTeam?.map((player) => (
                    <div key={player.cellId}>
                      <p>{getName(player.championId)}</p>
                      <p>{player.summonerId}</p>
                      <img src={getThumbnail(player.championId)} alt="e" />
                    </div>
                  ))}

                </pre>
              </code>
              <hr />
            </div>

          </section>
          <section>
            Picked champ
          </section>
        </div>
      )}
    </div>
  )
}
