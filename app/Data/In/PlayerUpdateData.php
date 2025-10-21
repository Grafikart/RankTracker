<?php

namespace App\Data\In;

use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Data;

class PlayerUpdateData extends Data
{
    public function __construct(
        public UploadedFile $avatar
    ) {}
}
