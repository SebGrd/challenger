import { createRootRoute, ErrorComponent, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Navbar from '../layout/Navbar'
import Sidebar from '../layout/Sidebar'
import Toolbar from '../layout/Toolbar'
import sorakaIcon from '@/images/soraka-icon.webp'
import { Suspense, useContext } from 'react'
import { StatusContext } from '../context/StatusContext'
import { ClientStatus } from '@/../types/client'

export const Route = createRootRoute({
  component: Root,
})

function Root() {
  const { status } = useContext(StatusContext);
  if (status === ClientStatus.OFFLINE) {
    return (
      <div className='fixed top-0 bottom-0 left-0 right-0 bg-zinc-950 z-50 flex flex-col items-center justify-center'>
        <p className='text-3xl mb-8'>Looking for League of Legends process</p>
        <img src={sorakaIcon} alt="Waiting image" className='size-32 animate-pulse' />
      </div>
    )
  }
  return (
    <>
      <div className='grid grid-rows-[auto_1fr] grid-cols-[1fr_auto] h-screen w-screen max-w-full'>
        <section className='row-span-1 col-span-2'>
          <Toolbar />
        </section>
        <main className='row-span-1 col-span-1 overflow-auto bg-zinc-900 grid grid-rows-[auto_1fr]'>
          <Navbar />
          <Outlet />
        </main>
        <section className='row-span-1 col-span-1'>
          <Sidebar />
        </section>
      </div>
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
  )
}