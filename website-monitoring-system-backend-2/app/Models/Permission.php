<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description'];

    // permission can be assigned to many roles -> many-to-many
    public function roles(){
        return $this->belongsToMany(Role::class);
    }

}
