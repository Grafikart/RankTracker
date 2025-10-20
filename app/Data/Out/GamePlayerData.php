<?php

namespace App\Data\Out;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class GamePlayerData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
    ) {}
}
