<?php

namespace App\Http\Controllers;

use App\Http\Requests\FIRERequest;
use App\Http\Requests\LocationRequest;
use App\Http\Requests\ReportRequest;
use App\Http\Resources\FIREResources;
use App\Models\FIRE as ModelsFIRE;
use App\Models\Location;
use App\Models\Report;
use Illuminate\Http\Request;

class FIRE extends Controller
{
    public function store(ReportRequest $report_request, FIRERequest $fire_request, LocationRequest $location_request){
        $reportdata = $report_request -> validated();
        $firedata = $fire_request -> validated();
        $locationdata = $location_request -> validated();

        if ( !isset( $firedata['Other_Information'] ) ){
            $firedata['Other_Information'] = 'N/A' ;
        }

        $report = Report::create([
            'user_id' => $reportdata['user_id'],
            'Type' => "Fire",
            'Status' => "Ongoing",
            'Date' => now(),
            'Time' => now()
        ]);

        $report_id = $report -> id;
        $firedata['report_id'] = $report_id;
        $locationdata['report_id'] = $report_id;

        $report = ModelsFIRE::create( $firedata );
        Location::create( $locationdata );

        return response( new FIREResources( $report ), 201);
    }
}
