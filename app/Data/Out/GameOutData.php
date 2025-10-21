<?php

namespace App\Data\Out;

use App\Models\Game;
use Carbon\CarbonImmutable;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class GameOutData extends Data
{
    public function __construct(
        public int $id,
        /** @var GamePlayerData[] */
        public array $team1,
        /** @var GamePlayerData[] */
        public array $team2,
        public int $team1_score,
        public int $team2_score,
        public CarbonImmutable $created_at,
        public bool $deletable,
    ) {}

    public static function fromModel(Game $game)
    {
        return self::from(
            $game,
            [
                'deletable' => request()->user()?->can('delete', $game),
                'team1' => $game->players->where('pivot.team', 1)->values(),
                'team2' => $game->players->where('pivot.team', 2)->values(),
            ],
        );
    }
}
