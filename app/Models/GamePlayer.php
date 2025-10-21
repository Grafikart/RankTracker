<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class GamePlayer extends Pivot
{
    protected function casts(): array
    {
        return [
            'state' => 'array',
        ];
    }

    /**
     * @return array{previous_ranking: [float, float], new_ranking: [float,float]}
     */
    public function getState(): array
    {
        return is_string($this->state) ? json_decode($this->state, true) : $this->state;
    }

    /**
     * Reset player data unsetting this game
     */
    public function resetPlayer(Player $player)
    {
        [$mu, $sigma] = $this->getState()['previous_ranking'];
        $player->mu = $mu;
        $player->sigma = $sigma;
        $player->games_count -= 1;
    }
}
