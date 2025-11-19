<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use HasFactory;

    protected $table = 'tutor_sessions';
    protected $fillable = ['title', 'description', 'date', 'time'];

    // Sessions that have been booked
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
