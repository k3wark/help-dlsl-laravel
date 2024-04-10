<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'location_id',
        'user_id',
        'Type',
        'Status',
        'Date',
        'Time'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function ems(){
        return $this->hasOne(EMS::class);
    }

    public function fire(){
        return $this->hasOne(FIRE::class);
    }

    public function security(){
        return $this->hasOne(SECURITY::class);
    }

    public function location(){
        return $this->hasOne(Location::class);
    }
}
