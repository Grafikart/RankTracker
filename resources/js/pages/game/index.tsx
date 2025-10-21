import { GameCard } from '@/components/game-card';
import FrontLayout from '@/layouts/front-layout';
import type { GameOutData, PaginatedCollection } from '@/types';
import { InfiniteScroll } from '@inertiajs/react';
import { LandPlotIcon } from 'lucide-react';
import type { ReactNode } from 'react';

type Props = {
    games: PaginatedCollection<GameOutData>;
};

function index({ games }: Props) {
    return (
        <div className="space-y-6">
            <h1 className="flex items-center gap-2 text-2xl font-bold">
                <LandPlotIcon />
                Derniers matchs
            </h1>
            <InfiniteScroll
                data="games"
                className="space-y-4"
                loading={() => 'Chargement des matchs...'}
            >
                {games.data.map((game) => (
                    <GameCard game={game} key={game.id} />
                ))}
            </InfiniteScroll>
        </div>
    );
}

index.layout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default index;
