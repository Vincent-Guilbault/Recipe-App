<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MenuRecipe extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'menu_id',
        'recipe_id',
        'day_name',
    ];

    public function recipe()
    {
        return $this->belongsTo(Recipe::class);
    }

    public function weeklyMenu()
    {
        return $this->belongsTo(WeeklyMenu::class);
    }
}
