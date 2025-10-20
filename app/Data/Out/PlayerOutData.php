<?php

namespace App\Data\Out;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class PlayerOutData extends Data
{
    public float $score;

    public function __construct(
        public int $id,
        public string $name,
        public float $mu,
        public float $sigma,
    ) {
        $this->score = round(100 * ($this->mu - 3 * $this->sigma));
    }
}
