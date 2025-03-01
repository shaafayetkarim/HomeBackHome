<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Ride;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Get user's upcoming rides (rides they created or joined)
        $upcomingRides = Ride::with('user')
            ->where(function ($query) use ($user) {
                $query->where('user_id', $user->id)
                    ->orWhereHas('passengers', function ($query) use ($user) {
                        $query->where('user_id', $user->id);
                    });
            })
            ->where('status', '!=', 'completed')
            ->where('status', '!=', 'cancelled')
            ->orderBy('date')
            ->orderBy('time')
            ->take(3)
            ->get()
            ->map(function ($ride) use ($user) {
                $ride->isOwner = $ride->user_id === $user->id;
                return $ride;
            });
        
        // Get nearby rides based on user's home location
        // This would typically use geolocation, but for simplicity we'll just get recent rides
        $nearbyRides = Ride::with('user')
            ->where('user_id', '!=', $user->id)
            ->where('status', 'pending')
            ->whereDoesntHave('passengers', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->orderBy('created_at', 'desc')
            ->take(3)
            ->get();
        
        return Inertia::render('Dashboard', [
            'user' => $user,
            'upcomingRides' => $upcomingRides,
            'nearbyRides' => $nearbyRides,
        ]);
    }
}

