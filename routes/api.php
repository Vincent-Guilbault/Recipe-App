<?php

use App\Http\Controllers\RecipeController;
use App\Http\Controllers\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WeeklyMenuController;

// Public routes for registration and login
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);

// Protected routes that require authentication
Route::middleware(['auth:sanctum'])->group(function () {
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

    // Route to get the user's weekly menu
    Route::get('/weekly-menu', [WeeklyMenuController::class, 'index']); // Get the weekly menu

    // Route to generate a new weekly menu
    Route::post('/generate-weekly-menu', [WeeklyMenuController::class, 'generate']); // Generate weekly menu

    // Get the authenticated user
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    // Route for updating user profile
    Route::put('/user', [UserController::class, 'update']);
});

