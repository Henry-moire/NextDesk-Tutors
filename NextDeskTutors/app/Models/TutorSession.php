<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TutorSession extends Model
{
    protected $fillable = [
        'tutor_id',
        'title',
        'date',
        'time',
        'description',
    ];

    public function tutor()
    {
        return $this->belongsTo(User::class, 'tutor_id');
    }
}

