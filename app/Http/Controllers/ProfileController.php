<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Show the form for editing the user's profile.
     */
    public function edit(Request $request)
    {
        $user = $request->user();
        $classRoutine = $user->classRoutine;
        
        return Inertia::render('Profile/Edit', [
            'user' => $user,
            'classRoutine' => $classRoutine,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request)
    {
        $user = $request->user();
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'home_address' => 'required|string|max:255',
            'gender' => 'required|string|in:male,female,other',
        ]);
        
        $user->name = $validated['name'];
        $user->phone = $validated['phone'];
        $user->home_address = $validated['home_address'];
        $user->gender = $validated['gender'];
        $user->save();
        
        return back()->with('success', 'Profile updated successfully.');
    }

    /**
     * Update the user's class routine.
     */
    public function updateRoutine(Request $request)
    {
        $user = $request->user();
        
        $validated = $request->validate([
            'routine' => 'required|array',
            'routine.*.day' => 'required|string',
            'routine.*.start_time' => 'nullable|string',
            'routine.*.end_time' => 'nullable|string',
        ]);
        
        // Save the routine to the user's class routine
        // This would typically be saved to a related model or JSON column
        $user->classRoutine = $validated['routine'];
        $user->save();
        
        return back()->with('success', 'Class routine updated successfully.');
    }
}

