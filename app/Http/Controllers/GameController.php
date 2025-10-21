<?php

namespace App\Http\Controllers;

use App\Data\In\GameStoreData;
use App\Data\Out\GameOutData;
use App\Data\Out\PlayerOutData;
use App\Models\Game;
use App\Models\GamePlayer;
use App\Models\Player;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Laragod\Skills\GameInfo;
use Laragod\Skills\Player as RankingPlayer;
use Laragod\Skills\Rating;
use Laragod\Skills\Team;
use Laragod\Skills\TrueSkill\TwoTeamTrueSkillCalculator;

class GameController extends Controller
{
    public function index()
    {
        $games = Game::with('players')->orderByDesc('created_at')->paginate(10);

        return Inertia::render('game/index', [
            'games' => Inertia::scroll(fn () => GameOutData::collect($games)),
        ]);
    }

    public function create()
    {
        Gate::authorize('create', Game::class);

        return Inertia::render('game/create', [
            'players' => PlayerOutData::collectRanked(Player::all()),
        ]);
    }

    public function store(GameStoreData $data)
    {
        Gate::authorize('create', Game::class);
        $playerIds = collect([...$data->team1, ...$data->team2])->flatten();
        $players = Player::whereIn('id', $playerIds)
            ->get()
            ->sortBy(fn (Player $player) => $playerIds->search($player->id));
        $playersById = $players->keyBy('id');
        $rankingPlayers = $players->keyBy('id')->map(fn (Player $player) => new RankingPlayer($player->id));

        // Build teams using the TrueSkill ranking system
        $teams = collect([$data->team1, $data->team2])
            ->map(function (array $team) use ($playersById, $rankingPlayers) {
                $t = new Team;
                foreach ($team as $playerId) {
                    $player = $playersById->get($playerId);
                    assert($player instanceof Player);
                    $t = $t->addPlayer(
                        $rankingPlayers->get($player->id),
                        new Rating($player->mu, $player->sigma)
                    );
                }

                return $t;
            });

        // Compute the new ratings
        $gameInfo = new GameInfo;
        $calculator = new TwoTeamTrueSkillCalculator;
        $ranks = $data->team1_score > $data->team2_score ? [1, 2] : [2, 1];
        $ratings = $calculator->calculateNewRatings($gameInfo, $teams->toArray(), $ranks);

        // Create the game
        DB::transaction(function () use ($data, $playersById, $ratings, $rankingPlayers) {
            $game = Game::create([
                'team1_score' => $data->team1_score,
                'team2_score' => $data->team2_score,
            ]);

            // Attach players to the game
            foreach ([$data->team1, $data->team2] as $k => $team) {
                foreach ($team as $playerId) {
                    $player = $playersById->get($playerId);
                    assert($player instanceof Player);
                    $rating = $ratings->getRating($rankingPlayers[$player->id]);
                    assert($rating instanceof Rating);

                    // Attach the player to the game
                    $game->players()->attach($player, [
                        'team' => $k + 1,
                        'state' => json_encode([
                            'previous_ranking' => [$player->mu, $player->sigma],
                            'new_ranking' => [$rating->getMean(), $rating->getStandardDeviation()],
                        ]),
                    ]);

                    // Update the player's rating
                    $player->mu = $rating->getMean();
                    $player->sigma = $rating->getStandardDeviation();
                    $player->games_count = $player->games_count + 1;
                    $player->last_match_at = now();
                    $player->save();
                }
            }
        });

        return to_route('game.index')->with('success', 'Le match a bien été enregistré');
    }

    public function destroy(Game $game)
    {
        DB::transaction(function () use ($game) {
            foreach ($game->players as $player) {
                $pivot = $player->pivot;
                assert($pivot instanceof GamePlayer);
                $pivot->resetPlayer($player);
                $player->save();
            }
            $game->delete();
        });

        return to_route('game.index')->with('success', 'Le match a bien été annulé');

    }
}
