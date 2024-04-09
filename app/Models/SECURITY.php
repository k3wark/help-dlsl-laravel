<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SECURITY extends Model
{
    use HasFactory;

    public $timestamps = false;
    
    protected $fillable = [
        'report_id',
        'Concern',
        'Other_Information'
    ];
    
    public function report(){
        return $this->belongsTo(report::class);
    }
}