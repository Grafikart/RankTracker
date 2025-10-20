<?php

namespace App\Data\In;

use Spatie\LaravelData\Data;

class GameStoreData extends Data
{
    public function __construct(
        /** @var int[] */
        public array $team1,
        /** @var int[] */
        public array $team2,
        public int $team1_score,
        public int $team2_score,
    ) {}
}
