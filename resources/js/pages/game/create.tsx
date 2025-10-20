import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    Item,
    ItemActions,
    ItemContent, ItemDescription,
    ItemTitle,
} from '@/components/ui/item';
import { useList } from '@/hooks/use-list';
import { chunk } from '@/lib/array';
import type { PlayerOutData } from '@/types';
import {
    CircleAlertIcon,
    CoinsIcon,
    PlusIcon,
    TrashIcon,
    XIcon,
} from 'lucide-react';
import { quality, Rating } from 'ts-trueskill';
import FrontLayout from '@/layouts/front-layout';
import { Input } from '@/components/ui/input';
import { TEAM_SIZE } from '@/lib/game';
import { Form } from '@inertiajs/react';
import games from '@/routes/game';
import { Separator } from '@/components/ui/separator';
import { Fragment, type ReactNode } from 'react';

type Props = {
    players: PlayerOutData[];
};

const idMapper = (player: { id: number }) => player.id;

function CreateGame({ players }: Props) {
    const [selectedPlayers, togglePlayer] = useList<PlayerOutData>([
    ]);
    const selectedIds = selectedPlayers.map(idMapper);
    const availablePlayers = players.filter((p) => !selectedIds.includes(p.id));
    const maxPlayers = TEAM_SIZE * 2

    return (
            <div className="space-y-4">
                <h1 className="text-lg font-bold">Créer un match</h1>
                    <Game players={selectedPlayers} onDelete={togglePlayer} />
                {selectedPlayers.length < maxPlayers && <div>
                    {availablePlayers.map((player) => (
                        <Item
                            key={player.id}
                            variant="outline"
                            className="rounded-none border-b-0 last:border-b-1"
                        >
                            <ItemContent className="flex-row gap-2">
                                <ItemTitle className="font-semibold">{player.name}</ItemTitle>
                                <ItemDescription className="flex items-center text-sm">
                                   (<CoinsIcon size={14} className="mr-1" />
                                    {player.score})
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
                </div>}
            </div>
    );
}

CreateGame.layout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

export default CreateGame;

type GameProps = {
    players: PlayerOutData[];
    onDelete: (player: PlayerOutData) => void;
}

function Game({ players, onDelete }: GameProps) {
    const teams = chunk(players, 2);
    const q = players.length === TEAM_SIZE * 2 ? quality(chunk(players.map(playerToRating),  2)) : 1;
    return (
        <Form className="space-y-4" action={games.store()}>
            {q < 0.4 && (
                <Alert>
                    <CircleAlertIcon />
                    <AlertTitle>Attention !</AlertTitle>
                    <AlertDescription>
                        Le match semble déséquilibré
                    </AlertDescription>
                </Alert>
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
                                            <TrashIcon className="size-3"/>
                                        </Button>
                                    </ItemActions>
                                    <input name={`team${k+1}[]`} type="hidden" value={player.id} />
                                </Item>
                            ))}
                            <Separator />
                            <Input required type="number" placeholder="Score" name={`team${k+1}_score`} className="w-40" defaultValue={k === 0 ? 2 : 0}/>
                        </div>
                        {k === 0 && <XIcon className="text-muted-foreground -mt-16" />}
                    </Fragment>
                ))}
            </div>
            <Button className="w-full" type="submit">
                Enregistrer le match
            </Button>
        </Form>
    );
}

function playerToRating(player: PlayerOutData) {
    return new Rating(player.mu, player.sigma);
}
