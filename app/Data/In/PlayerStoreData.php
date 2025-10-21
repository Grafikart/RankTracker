<?php

namespace App\Data\In;

use Spatie\LaravelData\Attributes\Validation\Unique;
use Spatie\LaravelData\Data;

class PlayerStoreData extends Data
{
    public function __construct(
        #[Unique('players', 'name')]
        public string $name,
    ) {}
}
