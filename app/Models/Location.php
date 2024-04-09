<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'report_id',
        'Building',
        'Area',
        'Room',
        'Floor'
    ];

    public function report(){
        return $this->belongsTo(report::class);
    }
}