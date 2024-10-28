<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecipeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
        // Get only the recipes that belong to the authenticated user
        $recipes = Recipe::where('user_id', Auth::id())->get();
        return response()->json($recipes);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        // Validate the input data
        $validatedData = $request->validate([
            'title' => 'required|string|max:50',
            'description' => 'nullable|string|max:255',
            'preparation_time' => 'nullable|integer|min:0|max:999',
            'external_link' => 'nullable|url',
            'category_id' => 'required|exists:categories,id',
        ]);

        // Automatically add the authenticated user's ID to the data
        $validatedData['user_id'] = Auth::id();

        // Create the recipe with the validated data
        $recipe = Recipe::create($validatedData);

        return response()->json($recipe, 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Validate the input data
        $validatedData = $request->validate([
            'title' => 'required|string|max:50',
            'description' => 'nullable|string|max:255',
            'preparation_time' => 'nullable|integer|min:0|max:999',
            'external_link' => 'nullable|url',
        ]);

        // Find the recipe by ID and ensure it belongs to the authenticated user
        $recipe = Recipe::where('id', $id)->where('user_id', Auth::id())->first();

        if (!$recipe) {
            return response()->json(['message' => 'Recipe not found or not authorized'], 404);
        }

        // Update the recipe with the validated data
        $recipe->update($validatedData);

        // Return the updated recipe
        return response()->json($recipe);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $recipe = Recipe::where('id', $id)->where('user_id', Auth::id())->first();

        if (!$recipe) {
            return response()->json(['message' => 'Recipe not found'], 404);
        }

        $recipe->forceDelete();  // Force delete the recipe
        return response()->json(['message' => 'Recipe deleted successfully']);
    }
}
