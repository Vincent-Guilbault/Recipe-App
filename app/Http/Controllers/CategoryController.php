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
        $user = Auth::user();
        return response()->json($user->categories);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
