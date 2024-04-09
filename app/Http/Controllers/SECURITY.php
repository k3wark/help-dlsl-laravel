<?php

namespace App\Http\Controllers;

use App\Http\Requests\LocationRequest;
use App\Http\Requests\ReportRequest;
use App\Http\Requests\SECURITYRequest;
use App\Http\Resources\SECURITYResources;
use App\Models\Location;
use App\Models\SECURITY as ModelsSECURITY;
use App\Models\Report;
use Illuminate\Http\Request;

class SECURITY extends Controller
{
    public function store(ReportRequest $report_request, SECURITYRequest $security_request, LocationRequest $location_request){
        $reportdata = $report_request -> validated();
        $securitydata = $security_request -> validated();
        $locationdata = $location_request -> validated();
        
        if ( !isset( $securitydata['Other_Information'] ) ){
            $securitydata['Other_Information'] = 'N/A' ;
        }

        $report = Report::create([
            'user_id' => $reportdata['user_id'],
            'Type' => "Security",
            'Status' => "Ongoing",
            'Date' => now(),
            'Time' => now()
        ]);

        $report_id = $report -> id;
        $securitydata['report_id'] = $report_id;
        $locationdata['report_id'] = $report_id;

        $report = ModelsSECURITY::create( $securitydata );
        Location::create( $locationdata );

        return response( new SECURITYResources( $report ), 201);
    }
}
