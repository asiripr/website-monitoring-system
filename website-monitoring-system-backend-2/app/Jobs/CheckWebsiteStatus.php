<?php

namespace App\Jobs;

use App\Models\MonitoringLog;
use App\Models\Website;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;

class CheckWebsiteStatus implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected Website $website;

    /**
     * Create a new job instance.
     */
    public function __construct(Website $website)
    {
        $this->website = $website;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $startTime = microtime(true);
        try {
            $response = Http::timeout(10)->get($this->website->url);
            $endTime = microtime(true);
            $responseTime = round(($endTime - $startTime) * 1000);
            $status = $response->successful() ? 'up' : 'down';
        } catch (\Exception $e) {
            $status = 'down';
            $responseTime = null;
        }

        if ($status === 'up') {
            // If the website is up, clear down_since.
            $this->website->update([
                'status'           => 'up',
                'last_checked_at'  => now(),
                'response_time'    => $responseTime,
                'down_since'       => null,
            ]);

            // Optionally, we can also log the up check if needed.
            MonitoringLog::create([
                'website_id'    => $this->website->id,
                'status'        => 'up',
                'response_time' => $responseTime,
                'checked_at'    => now(),
            ]);
        } else {
            // Create a new down log first.
            MonitoringLog::create([
                'website_id'    => $this->website->id,
                'status'        => 'down',
                'response_time' => $responseTime,
                'checked_at'    => now(),
            ]);

            // Calculate down_since based on monitoring logs.
            // Get the most recent "up" log for this website.
            $lastUp = MonitoringLog::where('website_id', $this->website->id)
                ->where('status', 'up')
                ->orderBy('checked_at', 'desc')
                ->first();

            if ($lastUp) {
                // Find the first down log after the last up.
                $firstDownAfterUp = MonitoringLog::where('website_id', $this->website->id)
                    ->where('status', 'down')
                    ->where('checked_at', '>', $lastUp->checked_at)
                    ->orderBy('checked_at', 'asc')
                    ->first();
                $downSince = $firstDownAfterUp ? $firstDownAfterUp->checked_at : now();
            } else {
                // No up log found: use the very first down log overall.
                $firstDown = MonitoringLog::where('website_id', $this->website->id)
                    ->where('status', 'down')
                    ->orderBy('checked_at', 'asc')
                    ->first();
                $downSince = $firstDown ? $firstDown->checked_at : now();
            }

            $this->website->update([
                'status'           => 'down',
                'last_checked_at'  => now(),
                'response_time'    => $responseTime,
                'down_since'       => $downSince,
            ]);
        }
    }
}
