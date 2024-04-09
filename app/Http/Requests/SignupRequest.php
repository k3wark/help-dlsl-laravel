<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class SignupRequest extends FormRequest
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
        // return as:
        return [
            // 'name' => 'required',
            'email' => 'required | email | unique:users,email',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->symbols()
            ],
            'Auth_Type' => 'nullable',
            'First_Name' => 'nullable',
            'Last_Name' => 'nullable',
            'Level' => 'nullable',
            'Grade' => 'nullable',
            'Phone_Number' => 'nullable',
            'Emergency_Name' => 'nullable',
            'Emergency_Number' => 'nullable',
            'House_Number' => 'nullable',
            'Barangay' => 'nullable',
            'City' => 'nullable',
            'Province' => 'nullable',
        ];
    }
}
