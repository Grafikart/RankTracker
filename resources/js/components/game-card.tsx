import type { GameOutData } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { ClockIcon, XIcon } from 'lucide-react';
import { format } from '@/lib/date';
import { cn } from '@/lib/utils';

type Props = {
    game: GameOutData;
    playerId?: number
}

export function GameCard({game, playerId}: Props) {
    const isPlayerInTeam1 = playerId ? game.team1.map((p) => p.id).includes(playerId) : false;
    return <Card className="pb-4">
        <CardContent className="space-y-2">
            <div className={cn("flex items-center gap-3", playerId && !isPlayerInTeam1 &&  "flex-row-reverse")}>
                <div className="space-y-1 font-bold mr-auto min-w-0 w-full">
                    {game.team1.map(player => <div className="text-ellipsis min-w-0 w-full line-clamp-1" key={player.id}>{player.name}</div>)}
                </div>
                <Score score={game.team1_score} diff={(!playerId || isPlayerInTeam1) ? game.team1_score - game.team2_score : 0}/>
                <XIcon size={20} className="text-muted-foreground flex-none"/>
                <Score score={game.team2_score} diff={(!playerId || !isPlayerInTeam1) ? game.team2_score - game.team1_score : 0}/>
                <div className="space-y-1 font-bold ml-auto min-w-0 w-full">
                    {game.team2.map(player => <div className="text-ellipsis min-w-0 w-full line-clamp-1" key={player.id}>{player.name}</div>)}
                </div>
            </div>
            <div className="text-muted-foreground flex justify-end items-center gap-2"><ClockIcon size={12}/>{format(game.created_at)}</div>
        </CardContent>
    </Card>
}

function Score ({score, diff}: {score: number, diff: number}) {
    const className = cn(
        "px-3 py-2 rounded-lg border text-lg font-bold",
        diff > 0 && "text-assertive bg-assertive/10 border-assertive",
        diff < 0 && 'text-destructive bg-destructive/10 border-destructive'
    )
    return <div className={className}>
        {score}
    </div>
}
