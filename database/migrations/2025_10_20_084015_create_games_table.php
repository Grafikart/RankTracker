<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->integer('team1_score')->default(0);
            $table->integer('team2_score')->default(0);
            $table->timestamps();
        });

        Schema::create('game_player', function (Blueprint $table) {
            $table->primary(['game_id', 'player_id']);
            $table->foreignIdFor(\App\Models\Game::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(\App\Models\Player::class)->constrained()->cascadeOnDelete();
            $table->json('state')->nullable();
            $table->integer('team')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
        Schema::dropIfExists('game_player');
    }
};
