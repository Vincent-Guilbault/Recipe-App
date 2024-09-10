<?php

use App\Http\Controllers\RecipeController;
use App\Http\Controllers\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/recipes', [RecipeController::class, 'index']);   // Get all recipes
Route::post('/recipes', [RecipeController::class, 'store']);  // Create a new recipe
Route::get('/recipes/{id}', [RecipeController::class, 'show']);  // Get a specific recipe
Route::put('/recipes/{id}', [RecipeController::class, 'update']); // Update a recipe
Route::delete('/recipes/{id}', [RecipeController::class, 'destroy']); // Delete a recipe

Route::get('/categories', [CategoryController::class, 'index']);   // Get all categories
Route::post('/categories', [CategoryController::class, 'store']);  // Create a new category
Route::get('/categories/{id}', [CategoryController::class, 'show']);  // Get a specific category
Route::put('/categories/{id}', [CategoryController::class, 'update']); // Update a category
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']); // Delete a category

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
