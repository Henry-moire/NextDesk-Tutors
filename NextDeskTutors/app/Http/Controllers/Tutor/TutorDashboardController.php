<?php

namespace App\Http\Controllers\Tutor;

use App\Http\Controllers\Controller;
use App\Models\TutorSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TutorDashboardController extends Controller
{
    public function index()
    {
        $tutor = Auth::user();

        // Protect dashboard
        if ($tutor->role !== 'tutor') {
            abort(403, 'Only tutors can access this area');
        }

        $sessions = TutorSession::where('tutor_id', $tutor->id)
            ->orderBy('date')
            ->orderBy('time')
            ->get();

        return Inertia::render('TutorDashboard', [
            'sessions' => $sessions,
            'tutor' => $tutor,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'date' => 'required|date',
            'time' => 'required',
            'description' => 'nullable|string',
        ]);

        TutorSession::create([
            'tutor_id' => Auth::id(),
            'title' => $request->title,
            'date' => $request->date,
            'time' => $request->time,
            'description' => $request->description,
        ]);

        return redirect()->back();
    }

    public function destroy(TutorSession $session)
    {
        if ($session->tutor_id !== Auth::id()) {
            abort(403);
        }

        $session->delete();
        return redirect()->back();
    }
}

