import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { format } from '@/lib/date';
import { cn } from '@/lib/utils';
import { destroy } from '@/routes/game';
import type { GameOutData } from '@/types';
import { Link } from '@inertiajs/react';
import { ClockIcon, TrashIcon, XIcon } from 'lucide-react';

type Props = {
    game: GameOutData;
    playerId?: number;
};

export function GameCard({ game, playerId }: Props) {
    const isPlayerInTeam1 = playerId
        ? game.team1.map((p) => p.id).includes(playerId)
        : false;
    return (
        <Card className="relative gap-2 pb-4">
            <CardContent
                className={cn(
                    'flex items-center gap-3',
                    playerId && !isPlayerInTeam1 && 'flex-row-reverse',
                )}
            >
                <div className="mr-auto w-full min-w-0 space-y-1 font-bold">
                    {game.team1.map((player) => (
                        <div
                            className="line-clamp-1 w-full min-w-0 text-ellipsis"
                            key={player.id}
                        >
                            {player.name}
                        </div>
                    ))}
                </div>
                <Score
                    score={game.team1_score}
                    diff={
                        !playerId || isPlayerInTeam1
                            ? game.team1_score - game.team2_score
                            : 0
                    }
                />
                <XIcon size={20} className="flex-none text-muted-foreground" />
                <Score
                    score={game.team2_score}
                    diff={
                        !playerId || !isPlayerInTeam1
                            ? game.team2_score - game.team1_score
                            : 0
                    }
                />
                <div className="ml-auto w-full min-w-0 space-y-1 font-bold">
                    {game.team2.map((player) => (
                        <div
                            className="line-clamp-1 w-full min-w-0 text-ellipsis"
                            key={player.id}
                        >
                            {player.name}
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="mt-2 flex items-center justify-end gap-2 leading-none text-muted-foreground">
                <ClockIcon size={12} />
                {format(game.created_at)}
                {game.deletable && (
                    <>
                        {' '}
                        -{' '}
                        <Link
                            href={destroy({ game: game.id })}
                            className="-mt-0.5"
                            onBefore={() =>
                                confirm(
                                    'Voulez vous vraiment annuler ce match ? Cette action est irréversible !',
                                )
                            }
                        >
                            <TrashIcon size={14} />
                        </Link>
                    </>
                )}
            </CardFooter>
        </Card>
    );
}

function Score({ score, diff }: { score: number; diff: number }) {
    const className = cn(
        'rounded-lg border px-3 py-2 text-lg font-bold',
        diff > 0 && 'border-assertive bg-assertive/10 text-assertive',
        diff < 0 && 'border-destructive bg-destructive/10 text-destructive',
    );
    return <div className={className}>{score}</div>;
}
