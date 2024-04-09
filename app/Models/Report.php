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
        return $this->belongsTo(user::class);
    }

    public function ems(){
        return $this->hasOne(ems::class);
    }

    public function fire(){
        return $this->hasOne(fire::class);
    }

    public function security(){
        return $this->hasOne(security::class);
    }

    public function location(){
        return $this->hasOne(location::class);
    }
}
