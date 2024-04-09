<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EMSRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'report_id' => 'exists:reports,id',
            'Patient_Condition' => 'required',
            'Concern' => 'required',
            'Other_Information' => 'nullable'
        ];
    }
}
