<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;

class AdminRecordCount extends Controller
{
    public function index(){
        
        $count = Report::count();
        $ems_count = Report::where('type', 'EMS')->count();
        $security_count = Report::where('type', 'Security')->count();
        $fire_count = Report::where('type', 'Fire')->count();
        
        return response()->json([
            'count' => $count,
            'ems_count' => $ems_count,
            'security_count' => $security_count,
            'fire_count' => $fire_count
        ]);
    }
}
