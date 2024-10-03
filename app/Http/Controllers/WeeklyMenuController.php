<?php

namespace App\Http\Controllers;

use App\Models\WeeklyMenu;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WeeklyMenuController extends Controller
{
    // Get the weekly menu for the authenticated user
    public function index()
    {
        $weeklyMenu = WeeklyMenu::with('days.recipe')
            ->where('user_id', Auth::id())
            ->latest()
            ->first();

        if (!$weeklyMenu) {
            return response()->json([], 200); // Return empty array if no menu is found
        }

        return response()->json($weeklyMenu);
    }

    // Generate a new weekly menu for the authenticated user
    public function generate()
    {
        $userId = Auth::id();
        $recipes = Recipe::where('user_id', $userId)->with('category')->get();

        if ($recipes->isEmpty()) {
            return response()->json(['message' => 'No recipes available to generate a menu.'], 400);
        }

        // Create a new weekly menu
        $weeklyMenu = WeeklyMenu::create([
            'user_id' => $userId,
            'week_start' => now(),
            'week_end' => now()->addDays(6),
        ]);

        // Shuffle recipes and create menu for each day, ensuring no same category consecutively
        $daysOfWeek = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        $previousCategory = null;
        $usedRecipes = collect();

        foreach ($daysOfWeek as $dayName) {
            // Filter available recipes that have not been used and are not from the previous category
            $availableRecipes = $recipes->filter(function ($recipe) use ($previousCategory, $usedRecipes) {
                return $recipe->category_id !== $previousCategory && !$usedRecipes->contains($recipe->id);
            });

            // If no recipes are available, reset the used recipes collection but keep the previous category check
            if ($availableRecipes->isEmpty()) {
                $availableRecipes = $recipes->filter(function ($recipe) use ($previousCategory) {
                    return $recipe->category_id !== $previousCategory;
                });

                // If still empty (e.g., very few recipes/categories), allow repeats across days
                if ($availableRecipes->isEmpty()) {
                    $availableRecipes = $recipes;
                    $usedRecipes = collect();  // Reset used recipes if we're forced to reuse recipes
                }
            }

            // Randomly select a recipe and update tracking variables
            $recipe = $availableRecipes->random();
            $previousCategory = $recipe->category_id;
            $usedRecipes->push($recipe->id);

            // Create a menu recipe entry with the day name
            $weeklyMenu->days()->create([
                'day_name' => $dayName,
                'recipe_id' => $recipe->id,
            ]);
        }

        // Return the newly generated menu
        return response()->json($weeklyMenu->load('days.recipe'));
    }
}
