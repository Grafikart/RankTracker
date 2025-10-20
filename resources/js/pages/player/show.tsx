import type { GameOutData, GamePlayerData, PaginatedCollection } from '@/types';
import type { ReactNode } from 'react';
import FrontLayout from '@/layouts/front-layout';
import { GameCard } from '@/components/game-card';
import { LandPlotIcon } from 'lucide-react';
import { InfiniteScroll } from '@inertiajs/react'

type Props = {
    player: GamePlayerData,
    games: PaginatedCollection<GameOutData>
}

function show({player, games}: Props) {
    return (
        <div className="space-y-6">
            <h1 className="font-bold text-2xl flex gap-2 items-center">
                <LandPlotIcon />
                <span className="text-muted-foreground font-normal">Matchs de</span> {player.name}
            </h1>
                <InfiniteScroll data="games" className="space-y-4" loading={() => "Chargement des matchs..."}>
                {games.data.map((game) => (
                    <GameCard game={game} key={game.id} playerId={player.id}/>
                ))}
                </InfiniteScroll>
        </div>
    )
}

show.layout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default show;

