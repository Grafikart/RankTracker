import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from '@/components/ui/item';
import { Separator } from '@/components/ui/separator';
import { useList } from '@/hooks/use-list';
import FrontLayout from '@/layouts/front-layout';
import { chunk } from '@/lib/array';
import { TEAM_SIZE } from '@/lib/game';
import { cn } from '@/lib/utils';
import games from '@/routes/game';
import type { PlayerOutData } from '@/types';
import { Form } from '@inertiajs/react';
import {
    AwardIcon,
    CircleAlertIcon,
    PlusIcon,
    TrashIcon,
    XIcon,
} from 'lucide-react';
import { Fragment, type ReactNode } from 'react';
import { Rating, winProbability } from 'ts-trueskill';

type Props = {
    players: PlayerOutData[];
};

const idMapper = (player: { id: number }) => player.id;

function CreateGame({ players }: Props) {
    const [selectedPlayers, togglePlayer] = useList<PlayerOutData>([]);
    const selectedIds = selectedPlayers.map(idMapper);
    const availablePlayers = players.filter((p) => !selectedIds.includes(p.id));
    const maxPlayers = TEAM_SIZE * 2;

    return (
        <div className="space-y-2">
            <h1 className="flex items-center gap-1 text-lg font-bold">
                <AwardIcon />
                Créer un match
            </h1>
            <p className="text-muted-foreground">
                Sélectionnez les joueurs qui participent au match (commencez par la première équipe)
            </p>
            <Game players={selectedPlayers} onDelete={togglePlayer} />
            {selectedPlayers.length < maxPlayers && (
                <div>
                    {availablePlayers.map((player) => (
                        <Item
                            key={player.id}
                            variant="outline"
                            className="rounded-none border-b-0 last:border-b-1"
                        >
                            <ItemContent className="flex-row gap-2">
                                <ItemTitle className="font-semibold">
                                    {player.name}
                                </ItemTitle>
                                <ItemDescription className="flex items-center text-sm">
                                    #{player.rank}
                                </ItemDescription>
                            </ItemContent>
                            <ItemActions>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    type="button"
                                    onClick={() => togglePlayer(player)}
                                >
                                    <PlusIcon />
                                    Ajouter
                                </Button>
                            </ItemActions>
                        </Item>
                    ))}
                </div>
            )}
        </div>
    );
}

CreateGame.layout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default CreateGame;

type GameProps = {
    players: PlayerOutData[];
    onDelete: (player: PlayerOutData) => void;
};

function Game({ players, onDelete }: GameProps) {
    const teams = chunk(players, 2);
    const isMatchReady = players.length === TEAM_SIZE * 2;
    const teamRatings = chunk(players.map(playerToRating), 2);
    const winChance = isMatchReady ? winProbability(teamRatings[0], teamRatings[1]) : null;
    return (
        <Form className="space-y-4" action={games.store()}>
            {winChance && (
                <WinProbability chance={winChance}/>
            )}
            <div className="mx-auto flex w-max items-center gap-4">
                {teams.map((team, k) => (
                    <Fragment key={team[0].id}>
                        <div className="space-y-4">
                            {team.map((player) => (
                                <Item key={player.id} variant="outline">
                                    <ItemContent>
                                        <ItemTitle>{player.name}</ItemTitle>
                                    </ItemContent>
                                    <ItemActions>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            type="button"
                                            className="size-8 rounded-sm"
                                            onClick={() => onDelete(player)}
                                        >
                                            <TrashIcon className="size-3" />
                                        </Button>
                                    </ItemActions>
                                    <input
                                        name={`team${k + 1}[]`}
                                        type="hidden"
                                        value={player.id}
                                    />
                                </Item>
                            ))}
                            {isMatchReady && <Separator />}
                            {isMatchReady && (
                                <Input
                                    required
                                    type="number"
                                    placeholder="Score"
                                    name={`team${k + 1}_score`}
                                    className="w-30"
                                />
                            )}
                        </div>
                        {k === 0 && teams.length > 1 && (
                            <XIcon
                                className={cn(
                                    'text-muted-foreground',
                                    isMatchReady && '-mt-16',
                                )}
                            />
                        )}
                    </Fragment>
                ))}
            </div>
            {isMatchReady && (
                <Button className="w-full" type="submit">
                    <PlusIcon /> Enregistrer le résultat
                </Button>
            )}
        </Form>
    );
}

function WinProbability({chance}: {chance: number}) {
    const favoriteTeam = chance > 0.5 ? 1 : 2;
    const winingTeamChange = chance > 0.5 ? chance : 1 - chance
    return (
        <Alert>
            <CircleAlertIcon />
            <AlertDescription>
                <p>
                    L'<strong>équipe {favoriteTeam}</strong> est favorite avec <strong>{Math.round(winingTeamChange * 100)}%</strong> de chance de gagner.
                </p>
            </AlertDescription>
        </Alert>
    )
}

function playerToRating(player: PlayerOutData) {
    return new Rating(player.mu, player.sigma);
}
