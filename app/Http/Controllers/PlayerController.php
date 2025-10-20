<?php

namespace App\Http\Controllers;

use App\Data\Out\GameOutData;
use App\Data\Out\GamePlayerData;
use App\Data\Out\PlayerOutData;
use App\Models\Player;
use Inertia\Inertia;

class PlayerController extends Controller
{
    public function index()
    {
        $players = Player::get()
            ->sortByDesc('score');
        return Inertia::render('player/index', [
            'players' => PlayerOutData::collectRanked($players)
        ]);
    }

    public function show(Player $player) {
        return Inertia::render('player/show', [
            'player' => GamePlayerData::from($player),
            'games' => Inertia::scroll(fn () => GameOutData::collect($player->games()->with('players')->paginate(10)))
        ]);
    }
}
