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
use PhpParser\Node\Stmt\TryCatch;

class CheckWebsiteStatus implements ShouldQueue
{
    use Queueable, Dispatchable, InteractsWithQueue, SerializesModels;

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
            $endtime = microtime(true);
            $responseTime = round(($endtime - $startTime)*1000);

            // determine status based on HTTP response
            $status = $response->successful() ? 'up' : 'down';
        } catch (\Exception $e) {
            // if an error occured mark as 'down'
            $status = 'down';
            $responseTime = null;
        }

        // update the website record with new status and last checked timestamp
        $this->website->update([
            'status' => $status,
            'last_checked_at' => now()
        ]);

        // create a new monitoring record
        MonitoringLog::create([
            'website_id' => $this->website->id,
            'status' => $status,
            'response_time' => $responseTime,
            'checked_at' => now()
        ]);
    }
}
