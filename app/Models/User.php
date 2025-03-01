<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'home_address',
        'gender',
        'class_routine',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Get the user's class routine.
     */
    public function getClassRoutineAttribute($value)
    {
        return $value ? json_decode($value, true) : null;
    }
    
    /**
     * Set the user's class routine.
     */
    public function setClassRoutineAttribute($value)
    {
        $this->attributes['class_routine'] = $value ? json_encode($value) : null;
    }

    public function rides()
    {
        return $this->hasMany(Ride::class);
    }

    public function joinedRides()
    {
        return $this->belongsToMany(Ride::class, 'ride_passengers');
    }
}

