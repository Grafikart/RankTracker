import { Button } from '@/components/ui/button';
import games from '@/routes/game';
import players from '@/routes/player';
import { Link } from '@inertiajs/react';
import { BadgePlusIcon, ListOrdered } from 'lucide-react';

export default function Header() {
    return (
        <header className="flex items-center justify-between bg-primary p-3 text-primary-foreground shadow-md">
            <Button
                variant="outline"
                size="icon"
                className="border-1 border-primary-foreground/40 bg-transparent"
                asChild
            >
                <Link href={players.index()}>
                    <ListOrdered />
                </Link>
            </Button>
            <span className="text-shadow mx-auto text-lg font-semibold">
                {import.meta.env.VITE_APP_NAME}
            </span>
            <Button
                variant="outline"
                size="icon"
                className="border-1 border-primary-foreground/40 bg-transparent"
                asChild
            >
                <Link href={games.create()}>
                    <BadgePlusIcon />
                </Link>
            </Button>
        </header>
    );
}
