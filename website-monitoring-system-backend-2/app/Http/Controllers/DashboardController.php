<?php

namespace App\Http\Controllers;

use App\Models\MonitoringLog;
use App\Models\Website;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
{
    $data = [
        'total_websites' => Website::count(),
        'total_logs' => MonitoringLog::count(),
        'uptime_percentage' => '95%', 
    ];

    return response()->json(['dashboard' => $data]);
}
}
