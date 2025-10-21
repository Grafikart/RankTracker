<?php

namespace App\Http\Controllers;

use App\Data\In\PlayerStoreData;
use App\Data\In\PlayerUpdateData;
use App\Data\Out\GameOutData;
use App\Data\Out\PlayerOutData;
use App\Models\Game;
use App\Models\Player;
use Inertia\Inertia;

class PlayerController extends Controller
{
    public function index()
    {
        $players = Player::query()
            ->with('media')
            ->get()
            ->sortByDesc('score');

        return Inertia::render('player/index', [
            'players' => PlayerOutData::collectRanked($players),
            'games' => Game::count(),
            'can_create' => request()->user()?->can('create', Player::class),
        ]);
    }

    public function show(Player $player)
    {
        $player->load('media');

        return Inertia::render('player/show', [
            'player' => PlayerOutData::from($player),
            'editable' => request()->user()?->can('update', $player),
            'games' => Inertia::scroll(fn () => GameOutData::collect($player->games()->with('players')->paginate(10))),
        ]);
    }

    public function update(Player $player, PlayerUpdateData $data)
    {
        $player->addMedia($data->avatar)->toMediaCollection('avatar');

        return to_route('player.show', $player)->with('success', "L'avatar a bien été modifié");
    }

    public function store(PlayerStoreData $data)
    {
        $player = new Player;
        $player->name = $data->name;
        $player->save();

        return to_route('player.index')->with('success', 'Le joueur a bien été créé');

    }
}
