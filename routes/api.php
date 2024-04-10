<?php
// get the directory for it to be used

use App\Http\Controllers\AdminRecordCount;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\EMS;
use App\Http\Controllers\FIRE;
use App\Http\Controllers\MergeAdminTables;
use App\Http\Controllers\MergeUserTables;
use App\Http\Controllers\SECURITY;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


// AUTHORIZED PAGE ONLY BECAUSE WE HAVE GET FROM DATABASE
// group only if there is /logout since it has get from database such as user
Route::middleware('auth:sanctum') -> group( function(){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    // This is to get /users requesting in network; used for axiosClient
    Route::apiResource('/users', UserController::class);
    
    // this is to connect and store data using controllers
    Route::apiResource('/ems', EMS::class);
    Route::apiResource('/fire', FIRE::class);
    Route::apiResource('/security', SECURITY::class);

    // this is to get tables from user reports
    Route::apiResource('/user_reports', MergeUserTables::class);

    // this is to get tables from admin reports
    Route::apiResource('/admin_home', AdminRecordCount::class);
    Route::apiResource('/admin_history', MergeAdminTables::class);
});



// UNAUTHORIZED USERS PAGE:::::

// signup page will access authcontroller then go to signup function
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
