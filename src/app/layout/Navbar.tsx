import { Link } from '@tanstack/react-router'

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-20 bg-zinc-950 border-b border-zinc-900">
            <ul className="flex items-center">
                <Link to="/challenges">
                    {({ isActive }) => (
                        <li className={`uppercase border-r border-zinc-900 px-6 py-2 hover:bg-zinc-800 ${isActive && "bg-zinc-800"}`}>
                            Challenges
                        </li>
                    )}
                </Link>
                <Link to="/titles">
                    {({ isActive }) => (
                        <li className={`uppercase border-r border-zinc-900 px-6 py-2 hover:bg-zinc-800 ${isActive && "bg-zinc-800"}`}>
                            Titles
                        </li>
                    )}
                </Link>
                <Link to="/pinned">
                    {({ isActive }) => (
                        <li className={`uppercase border-r border-zinc-900 px-6 py-2 hover:bg-zinc-800 ${isActive && "bg-zinc-800"}`}>
                            Pinned
                        </li>
                    )}
                </Link>
                <Link to="/live">
                    {({ isActive }) => (
                        <li className={`relative uppercase border-r ${isActive ? 'text-blue-400' : 'text-zinc-700'} border-zinc-900 px-6 py-2 hover:bg-blue-950 ${isActive && "bg-blue-950"}`}>
                            Live game
                            {isActive && <div className='absolute size-3 rounded-full bg-red-500 right-2 top-1/2 -translate-y-1/2 animate-pulse'></div>}
                        </li>
                    )}
                </Link>
            </ul>
        </nav>
    )
}