<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Session;
use App\Models\Booking;

class AdminDashboardController extends Controller
{
    public function index()
{
    $sessions = Session::all()->toArray();
    $bookings = Booking::with('session')->get()->toArray();
    $users = User::all()->toArray();

    return Inertia::render('AdminDashboard', [
        'sessions' => $sessions,
        'bookings' => $bookings,
        'users' => $users,
    ]);
}

}
