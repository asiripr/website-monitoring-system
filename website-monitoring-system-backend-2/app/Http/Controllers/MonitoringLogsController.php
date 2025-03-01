<?php

namespace App\Http\Controllers;

use App\Models\MonitoringLog;
use App\Models\Website;
use Illuminate\Http\Request;

class MonitoringLogsController extends Controller
{
    public function index()
    {
        $monitoring_logs = MonitoringLog::all();

        return response()->json([
            'monitoring_logs' => $monitoring_logs
        ]);
    }

    public function show($website_id)
    {
        // Return the website along with its monitoring logs using Eloquent relationships.
        $website = Website::with('monitoringLogs')->findOrFail($website_id);

        return response()->json([
            'website' => [
                'id' => $website->id,
                'url' => $website->url,
                'status' => $website->status,
                'last_checked_at' => $website->last_checked_at,
                'logs' => $website->monitoringLogs->map(
                    function ($log) {
                        return [
                            'id' => $log->id,
                            'status' => $log->status,
                            'response_time' => $log->response_time,
                            'checked_at' => $log->checked_at
                        ];
                    }
                ),
            ],
        ]);
    }
}
