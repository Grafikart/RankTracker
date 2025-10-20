<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Player extends Model
{
    /** @use HasFactory<\Database\Factories\PlayerFactory> */
    use HasFactory;

    public function games(): BelongsToMany
    {
        return $this->belongsToMany(Game::class)->orderByDesc('created_at');
    }

    public function score(): Attribute
    {
        return new Attribute(
            get: fn () => max(0, round(10 * ($this->mu - 3 * $this->sigma) + 20))
        );
    }

}
