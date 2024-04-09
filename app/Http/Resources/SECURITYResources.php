<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SECURITYResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array{
        return[
            'id' => $this -> id,
            'Concern' => $this -> Concern,
            'Other_Information' => $this -> Other_Information
        ];
    }
}
