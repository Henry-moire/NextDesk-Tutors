<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Session;
use App\Models\Booking;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class StudentDashboardController extends Controller
{
    public function index()
    {
        $student_id = Auth::id();

        $sessions = Session::whereNotIn('id', function ($query) use ($student_id) {
            $query->select('session_id')
                  ->from('bookings')
                  ->where('student_id', $student_id);
        })->orderBy('id')->get(); 

        $myBookings = Booking::with('session')
            ->where('student_id', $student_id)
            ->get();

        return Inertia::render('StudentDashboard', [
            'sessions' => $sessions,
            'myBookings' => $myBookings,
        ]);
    }

    public function book(Request $request)
    {
        $request->validate([
            'session_id' => 'required|exists:tutor_sessions,id',
        ]);

        Booking::create([
            'student_id' => Auth::id(),
            'session_id' => $request->session_id,
            'status' => 'booked',
        ]);

        return redirect()->route('student.dashboard');
    }

    public function update(Request $request, Booking $booking)
    {
        $request->validate([
            'date' => 'required|date',
            'time' => 'required',
        ]);

        $booking->session()->update([
            'date' => $request->date,
            'time' => $request->time,
        ]);

        return redirect()->route('student.dashboard');
    }

    public function cancel(Booking $booking)
    {
        $booking->delete();

        return redirect()->route('student.dashboard');
    }
}
