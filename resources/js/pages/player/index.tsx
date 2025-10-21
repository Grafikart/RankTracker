import { PlayerAvatar } from '@/components/player-avatar';
import { Button } from '@/components/ui/button';
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from '@/components/ui/item';
import FrontLayout from '@/layouts/front-layout';
import gameRoutes from '@/routes/game';
import { show } from '@/routes/player';
import type { PlayerOutData } from '@/types';
import { Link } from '@inertiajs/react';
import { AwardIcon, CoinsIcon, LandPlot, ListChecksIcon } from 'lucide-react';
import type { ReactNode } from 'react';

function index({
    players,
    games,
}: {
    players: PlayerOutData[];
    games: number;
}) {
    return (
        <div className="space-y-5">
            <div className="flex">
                <h1 className="flex items-center gap-1 text-lg font-bold">
                    <AwardIcon />
                    Classement
                </h1>
                {games > 0 && (
                    <Button asChild variant="outline" className="ml-auto">
                        <Link href={gameRoutes.index()}>
                            {games} matchs joués
                            <ListChecksIcon />
                        </Link>
                    </Button>
                )}
            </div>
            <div className="space-y-2">
                {players.map((player) => (
                    <PlayerCard player={player} key={player.id} />
                ))}
            </div>
            <p className="text-sm text-muted-foreground">
                Le système de classement utilise le système{' '}
                <a
                    href="https://www.microsoft.com/en-us/research/project/trueskill-ranking-system/"
                    target="_blank"
                    className="underline"
                >
                    TrueSkill™
                </a>
                , le score est donné à titre indicatif.
            </p>
        </div>
    );
}

function PlayerCard({ player }: { player: PlayerOutData }) {
    if (player.games_count === 0) {
        return (
            <Item variant="outline" className="rounded-md" asChild>
                <Link href={show({ player: player.id })}>
                    <ItemContent className="flex-row justify-between gap-2">
                        <ItemTitle className="font-semibold">
                            <PlayerAvatar {...player} />
                            {player.name}
                        </ItemTitle>
                        <ItemDescription className="text-sm">-</ItemDescription>
                    </ItemContent>
                </Link>
            </Item>
        );
    }

    return (
        <Item variant="outline" className="rounded-md" asChild>
            <Link href={show({ player: player.id })}>
                <ItemContent className="flex-row gap-2">
                    <ItemTitle className="font-semibold">
                        <PlayerAvatar {...player} />
                        {player.name}
                    </ItemTitle>
                    <ItemDescription className="contents">
                        <div className="flex items-center gap-1">
                            |
                            <LandPlot size={14} /> {player.games_count} matchs
                        </div>
                        <div className="flex items-center text-sm">
                            (<CoinsIcon size={14} className="mr-1" />
                            {player.score})
                        </div>
                        <div className="ml-auto">
                            {medal(player.rank)} #{player.rank}
                        </div>
                    </ItemDescription>
                </ItemContent>
            </Link>
        </Item>
    );
}

function medal(rank: number) {
    switch (rank) {
        case 1:
            return '🥇';
        case 2:
            return '🥈';
        case 3:
            return '🥉';
        default:
            return null;
    }
}

index.layout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default index;
