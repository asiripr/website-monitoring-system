<?php

use App\Jobs\CheckAllWebsites;
use App\Jobs\CheckWebsiteStatus;
use App\Models\Website;
use Illuminate\Console\Scheduling\Schedule as SchedulingSchedule;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::job(new CheckAllWebsites)
    ->everyFiveMinutes()
    ->name('check_all_websites')
    ->withoutOverlapping();
