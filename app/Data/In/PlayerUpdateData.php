<?php

namespace App\Data\In;

use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Attributes\Validation\Image;
use Spatie\LaravelData\Data;

class PlayerUpdateData extends Data
{
    public function __construct(
        #[Image]
        public UploadedFile $avatar
    ) {}
}
