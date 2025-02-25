<?php

namespace App\Http\Controllers;

use App\Models\Website;
use Illuminate\Http\Request;

class WebsiteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate input
        $validated = $request->validate([
            'url' => 'required',
            'check_interval' => 'nullable|integer|min:30',
        ]);

        // $validated['user_id'] = $request->user()->id; 
        $validated['user_id'] = 12;

        $validated['status'] = $validated['status'] ?? 'unknown';

        $validated['last_checked_at'] = $validated['last_checked_at'] ?? null;

        $website = Website::create($validated);

        return response()->json([
            'message' => 'Website created successfully',
            'website' => $website,
        ], 201);
    
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
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
