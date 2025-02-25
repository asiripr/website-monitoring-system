<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Website extends Model
{
    use HasFactory;

    protected $table = 'websites';
    protected $primaryKey = 'id';

    protected $fillable = ['user_id', 'url', 'status', 'last_checked_at'];

    // user can be assigned to many websites -> one-to-many
    public function user(){
        return $this->belongsTo(User::class);
    }

    // a website has multiple monitoring logs -> one-to-many
    public function monitoringLogs(){
        return $this->hasMany(MonitoringLog::class);
    }
}
