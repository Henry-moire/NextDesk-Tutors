<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = ['student_id', 'session_id', 'status'];

    public function user()
    {
        return $this->belongsTo(User::class); // Assumes bookings table has user_id
    }

    // The session that was booked
    public function session()
    {
        return $this->belongsTo(Session::class);
    }

    // The student who booked
    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }
}
