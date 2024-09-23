<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function update(Request $request)
    {
        // Validate the request data
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . Auth::id(),
            'password' => 'nullable|string|min:8|confirmed',  // Password confirmation validation
        ]);

        // Get the authenticated user
        $user = User::find(Auth::id());

        // Update user fields
        $user->name = $request->input('name');
        $user->email = $request->input('email');

        // Update the password only if it's provided
        if ($request->filled('password')) {
            $user->password = Hash::make($request->input('password'));
        }

        // Save the changes
        $user->save();

        // Return the updated user data as JSON
        return response()->json($user);
    }
}

