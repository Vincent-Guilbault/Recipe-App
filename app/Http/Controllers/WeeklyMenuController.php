<?php

namespace App\Http\Controllers;

use App\Models\MenuRecipe;
use App\Models\WeeklyMenu;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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

        // Permanently delete any soft-deleted weekly menus for the user
        $existingMenu = WeeklyMenu::where('user_id', $userId)->withTrashed()->forceDelete();

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
            $availableRecipes = $recipes->filter(function ($recipe) use ($previousCategory, $usedRecipes) {
                return $recipe->category_id !== $previousCategory && !$usedRecipes->contains($recipe->id);
            });

            if ($availableRecipes->isEmpty()) {
                $availableRecipes = $recipes->filter(function ($recipe) use ($previousCategory) {
                    return $recipe->category_id !== $previousCategory;
                });

                if ($availableRecipes->isEmpty()) {
                    $availableRecipes = $recipes;
                    $usedRecipes = collect();
                }
            }

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

    // Reroll a day in the weekly menu
    public function rerollDay($menuDayId)
    {
        // Find the specific day's menu using the menu_recipes table (MenuRecipe model)
        $menuDay = MenuRecipe::find($menuDayId);

        if (!$menuDay) {
            return response()->json(['message' => 'Menu day not found'], 404);
        }

        $userId = Auth::id();
        $recipes = Recipe::where('user_id', $userId)->with('category')->get();

        if ($recipes->isEmpty()) {
            return response()->json(['message' => 'No recipes available to reroll.'], 400);
        }

        // Get all recipe IDs currently used in the weekly menu (excluding the current day's recipe)
        $currentMenuRecipeIds = MenuRecipe::where('weekly_menu_id', $menuDay->weekly_menu_id)
            ->where('id', '!=', $menuDayId)
            ->pluck('recipe_id')
            ->toArray();

        // Get the previous category of the day's current recipe
        $previousCategory = $menuDay->recipe ? $menuDay->recipe->category_id : null;

        // Filter available recipes that aren't from the same category and aren't already in the weekly menu
        $availableRecipes = $recipes->filter(function ($recipe) use ($previousCategory, $currentMenuRecipeIds) {
            return $recipe->category_id !== $previousCategory && !in_array($recipe->id, $currentMenuRecipeIds);
        });

        if ($availableRecipes->isEmpty()) {
            return response()->json(['message' => 'No alternate recipes available'], 400);
        }

        // Randomly select a new recipe from the filtered list
        $newRecipe = $availableRecipes->random();
        $menuDay->update([
            'recipe_id' => $newRecipe->id,
        ]);

        // Return the updated menu day with the new recipe
        return response()->json($menuDay->load('recipe'));
    }
}
