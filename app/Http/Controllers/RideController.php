<?php

namespace App\Http\Controllers;

use App\Models\Ride;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class RideController extends Controller
{
    /**
     * Display a listing of the rides.
     */
    public function index()
    {
        $rides = Ride::with('user', 'passengers')
            ->where('status', 'pending')
            ->orderBy('date')
            ->orderBy('time')
            ->get();
        
        return Inertia::render('Rides/Index', [
            'rides' => $rides
        ]);
    }

    /**
     * Show the form for creating a new ride.
     */
    public function create()
    {
        return Inertia::render('Rides/Create');
    }

    /**
     * Store a newly created ride in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'pickup_location' => 'required|string|max:255',
            'dropoff_location' => 'required|string|max:255',
            'date' => 'required|date',
            'time' => 'required',
            'gender_preference' => 'required|in:mixed,female_only,male_only',
            'max_passengers' => 'required|integer|min:1|max:4',
            'notes' => 'nullable|string',
        ]);
        
        $ride = new Ride();
        $ride->user_id = Auth::id();
        $ride->pickup_location = $validated['pickup_location'];
        $ride->dropoff_location = $validated['dropoff_location'];
        $ride->date = $validated['date'];
        $ride->time = $validated['time'];
        $ride->gender_preference = $validated['gender_preference'];
        $ride->max_passengers = $validated['max_passengers'];
        $ride->notes = $validated['notes'] ?? null;
        $ride->status = 'pending';
        $ride->save();
        
        return redirect()->route('rides.show', $ride->id);
    }

    /**
     * Display the specified ride.
     */
    public function show(Ride $ride)
    {
        $ride->load('user', 'passengers');
        
        $user = Auth::user();
        $isOwner = $ride->user_id === $user->id;
        $hasJoined = $ride->passengers->contains('id', $user->id);
        
        return Inertia::render('Rides/Show', [
            'ride' => $ride,
            'isOwner' => $isOwner,
            'hasJoined' => $hasJoined,
        ]);
    }

    /**
     * Join a ride.
     */
    public function join(Ride $ride)
    {
        // Check if ride is full
        if ($ride->passengers->count() >= $ride->max_passengers) {
            return back()->with('error', 'This ride is already full.');
        }
        
        // Check if user already joined
        if ($ride->passengers->contains('id', Auth::id())) {
            return back()->with('error', 'You have already joined this ride.');
        }
        
        // Add user to passengers
        $ride->passengers()->attach(Auth::id());
        
        return back()->with('success', 'You have successfully joined this ride.');
    }

    /**
     * Leave a ride.
     */
    public function leave(Ride $ride)
    {
        // Remove user from passengers
        $ride->passengers()->detach(Auth::id());
        
        return back()->with('success', 'You have left this ride.');
    }

    /**
     * Start a ride.
     */
    public function start(Ride $ride)
    {
        // Check if user is the ride owner
        if ($ride->user_id !== Auth::id()) {
            return back()->with('error', 'Only the ride creator can start the ride.');
        }
        
        // Check if ride has passengers
        if ($ride->passengers->count() === 0) {
            return back()->with('error', 'You cannot start a ride with no passengers.');
        }
        
        $ride->status = 'active';
        $ride->save();
        
        return back()->with('success', 'Ride has been started.');
    }

    /**
     * End a ride.
     */
    public function end(Ride $ride)
    {
        // Check if user is the ride owner
        if ($ride->user_id !== Auth::id()) {
            return back()->with('error', 'Only the ride creator can end the ride.');
        }
        
        $ride->status = 'completed';
        $ride->save();
        
        return back()->with('success', 'Ride has been completed.');
    }

    /**
     * Display the user's rides.
     */
    public function myRides()
    {
        $user = Auth::user();
        
        $rides = Ride::with('user', 'passengers')
            ->where(function ($query) use ($user) {
                $query->where('user_id', $user->id)
                    ->orWhereHas('passengers', function ($query) use ($user) {
                        $query->where('user_id', $user->id);
                    });
            })
            ->orderBy('date')
            ->orderBy('time')
            ->get()
            ->map(function ($ride) use ($user) {
                $ride->isOwner = $ride->user_id === $user->id;
                return $ride;
            });
        
        return Inertia::render('MyRides', [
            'rides' => $rides
        ]);
    }
}

