<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;
    protected $fillable = ['name'];

    // a role has many users -> one-to-many
    public function users(){
        return $this->hasMany(User::class);
    }
    // a role has many permissions -> many-to-many
    public function permissions(){
        return $this->belongsToMany(Permission::class, 'role_permssions');
    }
}
