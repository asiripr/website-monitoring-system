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
            'downed_websites' => Website::where('status', 'down')->get()->map(function ($website) {
                return [
                    'id' => $website->id,
                    'url' => $website->url,
                    'status' => $website->status
                ];
            })
        ];

        return response()->json(['dashboard' => $data]);
    }
}
