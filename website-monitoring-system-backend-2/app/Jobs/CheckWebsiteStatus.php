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
    use Queueable, Dispatchable, InteractsWithQueue, SerializesModels;

    protected Website $website;

    /**
     * Create a new job instance.
     */
    public function __construct(Website $website) {
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
            $endtime = microtime(true);
            $responseTime = round(($endtime - $startTime) * 1000);

            // determine status based on HTTP response
            $status = $response->successful() ? 'up' : 'down';
        } catch (\Exception $e) {
            // if an error occured mark as 'down'
            $status = 'down';
            $responseTime = null;
        }

        // determine action based on the new status
        if ($status === 'up') {
            // if website is up, update the record and clear down_since if previously set.
            $this->website->update([
                'status' => 'up',
                'last_checked_at' => now(),
                'response_time' => $responseTime,
                'down_since' => null,
            ]);
        } else {
            // website is down
            // if website was not already down, set down_since to now.
            if ($this->website->status !== 'down') {
                $this->website->update([
                    'status' => 'down',
                    'last_checked_at' => now(),
                    'response_time' => $responseTime,
                    'down_since' => now(),
                ]);
            } else {
                // if already down, update last_checked_at and response_time without resetting down_since.
                $this->website->update([
                    'status' => 'down',
                    'last_checked_at' => now(),
                    'response_time' => $responseTime,
                ]);
            }
            // create a monitoring log entry for down status.
            MonitoringLog::create([
                'website_id' => $this->website->id,
                'status' => 'down',
                'response_time' => $responseTime,
                'checked_at' => now()
            ]);
        }
    }
}
