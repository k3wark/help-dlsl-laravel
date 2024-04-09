<?php

namespace App\Http\Controllers;

use App\Http\Requests\EMSRequest;
use App\Http\Requests\LocationRequest;
use App\Http\Requests\ReportRequest;
use App\Http\Resources\EMSResources;
use App\Models\EMS as ModelsEMS;
use App\Models\Location;
use App\Models\Report;
use Illuminate\Http\Request;

class EMS extends Controller
{
    public function store(ReportRequest $report_request, LocationRequest $location_request, EMSRequest $ems_request){
        $reportdata = $report_request -> validated();
        $emsdata = $ems_request -> validated();
        $locationdata = $location_request -> validated();
        
        if ( !isset( $emsdata['Other_Information'] ) ){
            $emsdata['Other_Information'] = 'N/A' ;
        }

        $report = Report::create([
            'user_id' => $reportdata['user_id'],
            'Type' => "EMS",
            'Status' => "Ongoing",
            'Date' => now(),
            'Time' => now()
        ]);

        $report_id = $report -> id;
        $emsdata['report_id'] = $report_id;
        $locationdata['report_id'] = $report_id;

        $report = ModelsEMS::create( $emsdata );
        Location::create( $locationdata );

        return response( new EMSResources( $report ), 201);
    }
}
