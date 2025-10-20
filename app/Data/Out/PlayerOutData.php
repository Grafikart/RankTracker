<?php

namespace App\Data\Out;

use App\Models\Player;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class PlayerOutData extends Data
{
    public function __construct(
        public int $id,
        public int $rank = 0,
        public string $name,
        public float $mu,
        public float $sigma,
        public float $score,
        public int $games_count,
    ) {
    }

    public static function collectRanked(Collection $items): array
    {
        return $items
            ->sortByDesc('score')
            ->values()
            ->map(fn (Player $player, $k) => self::from($player, ['rank' => $k + 1]))
            ->values()
            ->toArray();
    }
}
