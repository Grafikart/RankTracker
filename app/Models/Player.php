<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Player extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\PlayerFactory> */
    use HasFactory;

    use InteractsWithMedia;

    public function games(): BelongsToMany
    {
        return $this->belongsToMany(Game::class)
            ->using(GamePlayer::class)
            ->orderByDesc('created_at');
    }

    public function score(): Attribute
    {
        return new Attribute(
            get: fn () => $this->games_count ? max(0, round(10 * ($this->mu - 3 * $this->sigma) + 20)) : 0
        );
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('avatar')
            ->singleFile()
            ->useFallbackUrl(sprintf('/storage/avatar%d.png', (mb_strlen($this->name) % 4) + 1));
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this
            ->addMediaConversion('thumb')
            ->fit(Fit::Contain, 64, 64);
    }
}
