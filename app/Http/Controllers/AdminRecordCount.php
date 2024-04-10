<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;

class AdminRecordCount extends Controller
{
    public function index(){
        
        $count = Report::where('Status', 'Ongoing')->count();
        $ems_count = Report::where('type', 'EMS')
        ->where('Status', 'Ongoing')
        ->count();
        $security_count = Report::where('type', 'Security')
        ->where('Status', 'Ongoing')
        ->count();
        $fire_count = Report::where('type', 'Fire')
        ->where('Status', 'Ongoing')
        ->count();
        
        return response()->json([
            'count' => $count,
            'ems_count' => $ems_count,
            'security_count' => $security_count,
            'fire_count' => $fire_count
        ]);
    }
}
