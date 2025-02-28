<?php

namespace App\Jobs;

use App\Models\Website;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class CheckAllWebsites implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Website::select(['id', 'url'])
            ->chunkById(100, function ($websites) {
                foreach ($websites as $website) {
                    CheckWebsiteStatus::dispatch($website->id);
                }
            });
    }
}
