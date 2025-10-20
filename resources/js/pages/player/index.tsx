import FrontLayout from '@/layouts/front-layout';
import type { ReactNode } from 'react';
import type { PlayerOutData } from '@/types';
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from '@/components/ui/item';
import { CoinsIcon, LandPlot } from 'lucide-react';
import { Link } from '@inertiajs/react';
import {show} from '@/routes/player';

function index({ players }: { players: PlayerOutData[] }) {
    return (
        <div className="space-y-2">
            {players.map((player) => (
                <Item
                    key={player.id}
                    variant="outline"
                    className="rounded-none"
                    asChild
                >
                    <Link href={show({player: player.id})}>
                        <ItemContent className="flex-row gap-2">
                            <ItemTitle className="font-semibold">
                                {player.name}
                            </ItemTitle>
                            <ItemDescription className="contents">

                                {player.games_count > 0 && <div className="flex items-center gap-1">
                                    |
                                    <LandPlot size={14}/> {player.games_count} matchs
                                </div>}
                                <div className="flex items-center text-sm">
                                    (<CoinsIcon size={14} className="mr-1" />
                                    {player.score})
                                </div>
                                <div className="ml-auto">{medal(player.rank)} #{player.rank}</div>
                            </ItemDescription>
                        </ItemContent>
                    </Link>
                </Item>
            ))}
        </div>
    );
}

function medal(rank: number) {
    switch (rank) {
        case 1:
            return '🥇'
        case 2:
            return '🥈'
        case 3:
            return '🥉'
        default:
            return null
    }
}

index.layout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default index;
