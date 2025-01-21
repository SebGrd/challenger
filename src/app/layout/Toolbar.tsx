import icon from "@/../assets/icon.png";

export default function Header() {
    return (
        <header className="flex items-center justify-start bg-zinc-900 windrag h-[34px] px-4">
            <div className="flex items-center gap-2">
                <img src={icon} className="size-5" alt="icon" />
                <h1 className="text-sm uppercase font-medium text-zinc-400">League Challenges</h1>
            </div>
            <p className="bg-zinc-800 border-2 border-zinc-700 text-zinc-400 rounded-full text-sm px-24 absolute left-1/2 -translate-x-1/2">Search challenges, titles, ...</p>
        </header>
    )
}