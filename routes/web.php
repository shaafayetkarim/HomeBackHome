<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RideController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Guest routes
Route::middleware('guest')->group(function () {
    // Landing page
    Route::get('/', function () {
        return Inertia::render('Welcome');
    })->name('welcome');

    // Authentication routes
    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);
    
    Route::get('register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);
    
    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])->name('password.request');
    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])->name('password.email');
});

// Authenticated routes
Route::middleware('auth')->group(function () {
    // Logout
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
    
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/routine', [ProfileController::class, 'updateRoutine'])->name('routine.update');
    
    // Ride routes
    Route::get('/rides', [RideController::class, 'index'])->name('rides.index');
    Route::get('/rides/create', [RideController::class, 'create'])->name('rides.create');
    Route::post('/rides', [RideController::class, 'store'])->name('rides.store');
    Route::get('/rides/{ride}', [RideController::class, 'show'])->name('rides.show');
    Route::post('/rides/{ride}/join', [RideController::class, 'join'])->name('rides.join');
    Route::post('/rides/{ride}/leave', [RideController::class, 'leave'])->name('rides.leave');
    Route::post('/rides/{ride}/start', [RideController::class, 'start'])->name('rides.start');
    Route::post('/rides/{ride}/end', [RideController::class, 'end'])->name('rides.end');
    
    // My rides
    Route::get('/my-rides', [RideController::class, 'myRides'])->name('my-rides');
    
    // Static pages
    Route::get('/about', function () {
        return Inertia::render('About');
    })->name('about');
    
    Route::get('/privacy', function () {
        return Inertia::render('Privacy');
    })->name('privacy');
    
    Route::get('/terms', function () {
        return Inertia::render('Terms');
    })->name('terms');
    
    Route::get('/contact', function () {
        return Inertia::render('Contact');
    })->name('contact');
});

