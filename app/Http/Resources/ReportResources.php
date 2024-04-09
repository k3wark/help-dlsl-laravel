<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReportResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array{
        return[
            'id' => $this -> id,
            'Type' => $this -> Type,
            'Status' => $this -> Status,
            'building' => $this -> building,
            'area' => $this -> area,
            'room' => $this -> room,
            'floor' => $this -> floor
        ];
    }
}
