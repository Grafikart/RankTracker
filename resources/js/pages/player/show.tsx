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
import { ImageInput } from '@/components/ui/image-input';
import { ValidationErrors } from '@/components/ui/validation-errors';
import FrontLayout from '@/layouts/front-layout';
import { create } from '@/routes/game';
import { update } from '@/routes/player';
import type { GameOutData, PaginatedCollection, PlayerOutData } from '@/types';
import { Head, InfiniteScroll, Link, router } from '@inertiajs/react';
import { BadgePlusIcon } from 'lucide-react';
import type { ReactNode } from 'react';

type Props = {
    player: PlayerOutData;
    games: PaginatedCollection<GameOutData>;
    editable: boolean;
};

function show({ player, games, editable }: Props) {
    const onFileChange = (file: File) => {
        const formData = new FormData();
        formData.append('avatar', file);
        formData.append('_method', 'PUT');
        router.post(update({ player: player.id }).url, formData);
    };

    return (
        <div className="space-y-6">
            <Head title={`Matchs de ${player.name}`} />
            <h1 className="flex items-center gap-4 text-2xl font-normal text-muted-foreground">
                {editable ? (
                    <ImageInput
                        onFileChange={onFileChange}
                        defaultValue={player.avatar}
                        className="size-12 overflow-hidden rounded-lg"
                    />
                ) : (
                    <PlayerAvatar {...player} className="size-12" />
                )}
                <span>
                    Matchs de <strong>{player.name}</strong>
                </span>
            </h1>
            <ValidationErrors prefix="avatar" />
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
