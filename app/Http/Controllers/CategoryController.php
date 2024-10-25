<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get all categories along with their related recipes
        $categories = Category::with('recipes')->where('user_id', Auth::id())->get();
        return response()->json($categories);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {

        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $user = Auth::user();

        $category = new Category([
            'name' => $request->input('name'),
            'user_id' => $user->id,
        ]);

        $category->save();

        return response()->json($category, 201);
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
        //Validate the input data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        // Find the category by ID and ensure it belongs to the authenticated user
        $category = Category::where('id', $id)->where('user_id', Auth::id())->first();

        if (!$category) {
            return response()->json(['message' => 'Category not found or not authorized'], 404);
        }

        // Update the category with the validated data
        $category->update($validatedData);

        // Return the updated category
        return response()->json($category);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::where('id', $id)->where('user_id', Auth::id())->first();

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $category->forceDelete();  // Force delete the category
        return response()->json(['message' => 'Category deleted successfully']);
    }
}
