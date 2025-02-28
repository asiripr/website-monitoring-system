<?php

use App\Jobs\CheckWebsiteStatus;
use App\Models\Website;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::call(function () {
    Website::all()->each(function ($website) {
        CheckWebsiteStatus::dispatch($website);
    });
})->everyFiveMinutes();