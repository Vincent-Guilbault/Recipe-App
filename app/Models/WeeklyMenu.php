<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class WeeklyMenu extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'week_start',
        'week_end',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
