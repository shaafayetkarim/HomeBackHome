<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ride extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'pickup_location',
        'dropoff_location',
        'date',
        'time',
        'gender_preference',
        'max_passengers',
        'notes',
        'status',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'passengers_count',
    ];

    /**
     * Get the user that created the ride.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the passengers for the ride.
     */
    public function passengers()
    {
        return $this->belongsToMany(User::class, 'ride_passengers');
    }

    /**
     * Get the number of passengers.
     */
    public function getPassengersCountAttribute()
    {
        return $this->passengers->count();
    }
}

