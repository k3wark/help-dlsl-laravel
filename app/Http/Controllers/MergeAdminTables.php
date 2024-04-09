<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateReportRequest;
use App\Models\EMS;
use App\Models\FIRE;
use App\Models\Location;
use App\Models\Report;
use App\Models\SECURITY;
use Illuminate\Http\Request;

class MergeAdminTables extends Controller {
    public function index(){
        $reports = Report::with('user', 'location')
            ->orderBy('id', 'desc')
            ->get();
        return response()->json(['data' => $reports]);
    }

    public function show($report_id){
        
        $report = Report::where('id', $report_id)
            ->with('user')
            ->first();
        
        if (!$report){
            return response([
                'message' => 'No Report ID'
            ], 422);
        }

        $user = $report -> user;
        $report_type = $report -> Type;
        $report_status = $report -> Status;
        if ($report_type == "EMS"){
            $report_information = EMS::where('report_id', $report_id)->first();
        }

        else if ($report_type == "Security"){
            $report_information = Security::where('report_id', $report_id)->first();
        }

        else if ($report_type == "Fire"){
            $report_information = Fire::where('report_id', $report_id)->first();
        }

        $report_location = Location::where('report_id', $report_id)->first();

        return response()->json([
            'User' => $user,
            'Type' => $report_type,
            'Status' => $report_status,
            'Information' => $report_information,
            'Location' => $report_location
        ]);
    }

    public function update(UpdateReportRequest $request){
        $status = $request -> validated();

        if ($status['Status'] == "Ongoing"){
            $status['Status'] = "Completed";
        }
        else if ($status['Status'] == "Completed"){
            $status['Status'] = "Ongoing";
        }

        $table = Report::find($status['id']);
        $table -> update ($status);
        
        return $table;
    }
}
