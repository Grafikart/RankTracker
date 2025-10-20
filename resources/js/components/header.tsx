import { Button } from '@/components/ui/button';
import { BadgePlusIcon, ListOrdered } from 'lucide-react';
import { Link } from '@inertiajs/react';
import games from '@/routes/game';
import players from '@/routes/player';

export default function Header() {
    return <header className="bg-primary text-primary-foreground p-3 shadow-md flex items-center justify-between">
        <Button variant="outline" size="icon" className="bg-transparent border-1 border-primary-foreground/40" asChild>
            <Link href={players.index()}>
            <ListOrdered />
            </Link>
        </Button>
        <span className="font-semibold text-lg text-shadow">
            {import.meta.env.VITE_APP_NAME}
        </span>
        <Button variant="outline" size="icon" className="bg-transparent border-1 border-primary-foreground/40" asChild>
            <Link href={games.create()}>
            <BadgePlusIcon />
            </Link>
        </Button>
    </header>
}
