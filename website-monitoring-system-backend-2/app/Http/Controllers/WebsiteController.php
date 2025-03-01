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
        $validated = $request->all();
        // $validated = $request->validate([
        //     'name' => 'required|string|max:255',
        //     'url' => 'required|url|unique:websites,url',
        //     'status' => 'nullable|string|in:up,down',
        //     'last_checked_at' => 'nullable|date'
        // ]);

        $website = Website::create([
            'user_id' => 12,
            // 'user_id' => $request->user()->id,
            'name' => $validated['name'],
            'url' => $validated['url'],
            'status' => $validated['status'] ?? 'unknown',
            'last_checked_at' => $validated['last_checked_at'] ?? now()
        ]);

        return response()->json([
            'message' => 'Website created successfully',
            'website' => $website
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
