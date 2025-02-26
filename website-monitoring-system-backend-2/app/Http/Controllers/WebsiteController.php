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
        $input = $request->all();
        // $input = $request->validate([
        //     'name' => 'required|string',
        //     'url' => 'required|url',
        //     'status' => 'nullable|string',
        //     'last_checked_at' => 'nullable|date',
        // ]);

        // get the authenticated user from the token
        $user = $request->user();

        // $input['user_id'] = $request->user()->id;
        $input['user_id'] = 12;

        $input['status'] = $input['status'] ?? 'unknown';

        $input['last_checked_at'] = $input['last_checked_at'] ?? null;

        $website = Website::create($input);

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
