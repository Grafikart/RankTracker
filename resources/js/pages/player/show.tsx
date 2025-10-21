import { GameCard } from '@/components/game-card';
import { PlayerAvatar } from '@/components/player-avatar';
import { Button } from '@/components/ui/button';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';
import { Icon } from '@/components/ui/icon';
import FrontLayout from '@/layouts/front-layout';
import { create } from '@/routes/game';
import type { GameOutData, GamePlayerData, PaginatedCollection } from '@/types';
import { InfiniteScroll, Link } from '@inertiajs/react';
import { BadgePlusIcon } from 'lucide-react';
import type { ReactNode } from 'react';

type Props = {
    player: GamePlayerData;
    games: PaginatedCollection<GameOutData>;
};

function show({ player, games }: Props) {
    return (
        <div className="space-y-6">
            <h1 className="flex items-center gap-4 text-2xl font-bold font-normal text-muted-foreground">
                <PlayerAvatar {...player} className="size-12" />
                <span>
                    Matchs de <strong>{player.name}</strong>
                </span>
            </h1>
            {games.data.length === 0 && (
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <Icon />
                        </EmptyMedia>
                        <EmptyTitle>Aucun matchs</EmptyTitle>
                        <EmptyDescription>
                            {player.name} n'a pas encore joué de matchs :(
                        </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                        <Button variant="secondary" asChild>
                            <Link href={create()}>
                                <BadgePlusIcon /> Enregistrer un match
                            </Link>
                        </Button>
                    </EmptyContent>
                </Empty>
            )}
            <InfiniteScroll
                data="games"
                className="space-y-4"
                loading={() => 'Chargement des matchs...'}
            >
                {games.data.map((game) => (
                    <GameCard game={game} key={game.id} playerId={player.id} />
                ))}
            </InfiniteScroll>
        </div>
    );
}

show.layout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default show;
