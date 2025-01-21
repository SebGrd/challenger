import { useStore } from '@/context/StoreContext'
import { cn } from '@/lib/utils';
import { LolChallengesUIChallenge } from '@hasagi/core/types/lcu-types';
import { Outlet, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react';

export default function ChallengesNavbar() {
    const { challengesCategories } = useStore();
    const [displayedCategories, setDisplayedCategories] = useState<LolChallengesUIChallenge[]>([]);

    useEffect(() => {
        if (challengesCategories.data) {
            const filteredCategories = Object.values(challengesCategories.data).filter((category) => category.parentId === 0);
            setDisplayedCategories(filteredCategories);
        }
    }, [challengesCategories.data]);

    return (
        <div>
            <nav>
                <ul className="flex items-center mb-4 px-0 border-b border-zinc-950">
                    {
                        displayedCategories.map((category) => (
                            <Link to={`/challenges/${category.id}`} key={category.id}>
                                {({ isActive }) => (
                                    <li>
                                        <div className={`flex items-center gap-2 py-2 px-4 border-r border-zinc-950 ${isActive && ' bg-zinc-800'}`}>
                                            <p className={cn(
                                                "uppercase font-medium",
                                                `text-rank-${category.currentLevel.toLowerCase()}`
                                            )}>{category.name}</p>
                                        </div>
                                    </li>
                                )}
                            </Link>
                        ))
                    }
                </ul>
            </nav>
        </div>
    )
}