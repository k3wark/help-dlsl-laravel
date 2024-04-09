<?php

namespace App\Http\Controllers;

use App\Http\Resources\EMSResources;
use App\Http\Resources\FIREResources;
use App\Http\Resources\SECURITYResources;
use App\Models\EMS;
use App\Models\FIRE;
use App\Models\Report;
use App\Models\SECURITY;
use App\Models\User;
use Illuminate\Http\Request;

class MergeUserTables extends Controller
{
    public function index(Request $request){
        $user = $request->user();
        $reports = Report::with('EMS', 'Security', 'Fire')
            ->where('user_id', $user->id)
            ->orderBy('id', 'desc')->get();
        return response()->json(['data' => $reports]);
    }
}
