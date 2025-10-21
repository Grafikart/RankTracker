<?php

use App\Models\Game;
use App\Models\Player;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('should not anyone create a game', function () {
    $response = $this->post(route('game.store'));
    $response->assertRedirect(route('login'));
});

describe('logged in user', function () {
    beforeEach(function () {
        $this->players = Player::factory(10)->create();
        $this->actingAs(User::factory()->create());
        $this->data = [
            'team1' => [$this->players[0]->id, $this->players[1]->id],
            'team2' => [$this->players[2]->id, $this->players[3]->id],
            'team1_score' => 1,
            'team2_score' => 4,
        ];
    });

    it('should create a game with the right data', function () {
        $response = $this->post(route('game.store'), $this->data);
        $response->assertRedirect(route('game.index'));
        expect(Game::count())->toBe(1)
            ->and($this->players[0]->refresh()->mu)->toBeLessThan($this->players[3]->refresh()->mu);
    });

    it('should reset score on destroy', function () {
        $response = $this->post(route('game.store'), $this->data);
        $response->assertRedirect(route('game.index'));
        $game = Game::first();
        $response = $this->delete(route('game.destroy', ['game' => $game->id]));
        $response->assertRedirect(route('game.index'));
        expect(Game::count())->toBe(0)
            ->and($this->players[0]->refresh()->mu)->toBe(25.0);

    });
});
