<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool{
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array{
        return [
            'name' => 'required | string | max:55',
            // tells the laravel that since updating user will have a same email to itself, exempt by using $this -> id
            // TANGINA WAG MONG LAGYAN NG SPACE
            'email' => 'required|email|unique:users,email,'.$this->id,
            // 'email' => 'required | email | unique: users, email,' .$this -> id,
            'password' => [
                'confirmed',
                Password::min(8)
                    -> letters()
                    -> symbols()
            ]
        ];
    }
}
