<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Cache;

class Game extends Model
{
    /** @use HasFactory<\Database\Factories\GameFactory> */
    use HasFactory;

    protected $fillable = [
        'team1_score',
        'team2_score',
    ];

    public function players(): BelongsToMany
    {
        return $this->belongsToMany(Player::class)
            ->using(GamePlayer::class)
            ->withPivot('team', 'state');
    }

    public static function lastId(): int
    {
        return Cache::remember('last_id', 5, function () {
            return Game::orderByDesc('created_at')->select('id')->first()?->id ?? 0;
        });
    }
}
