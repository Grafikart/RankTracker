<?php

namespace Database\Seeders;

use App\Models\Player;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'john@doe.fr'],
            [
                'name' => 'John Doe',
                'password' => Hash::make('john@doe.fr'),
                'email_verified_at' => now(),
            ]
        );

        Player::factory(10)
            ->sequence(fn ($sequence) => ['name' => sprintf('Player %s', $sequence->index + 1)])
            ->create();
    }
}
