<?php

use App\Models\Player;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('should not anyone create a player', function () {
    $response = $this->post(route('player.store'));
    $response->assertRedirect(route('login'));
});

describe('logged in user', function () {
    beforeEach(function () {
        $this->actingAs(User::factory()->create());
        $this->data = [
            'name' => 'Test Player',
        ];
    });

    it('should create a player with the right data', function () {
        $response = $this->post(route('player.store'), $this->data);
        $response->assertRedirect(route('player.index'));
        expect(Player::count())->toBe(1);
    });

    it('should not allow duplicate', function () {
        Player::factory()->create($this->data);
        $response = $this->post(route('player.store'), $this->data);
        $response->assertSessionHasErrors('name');
    });
});
