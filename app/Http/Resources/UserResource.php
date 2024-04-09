<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    // return user table into json file
    public function toArray(Request $request): array{
        return [
            'id' => $this -> id,
            'name' => $this -> name,
            'email' => $this -> email,
            'Auth_Type' => $this -> Auth_Type,
            'created_at' => $this -> created_at -> format('Y-m-d H:i:s')
        ];
    }
}
