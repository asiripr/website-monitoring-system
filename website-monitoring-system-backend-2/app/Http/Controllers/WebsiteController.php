<?php

namespace App\Http\Controllers;

use App\Jobs\CheckWebsiteStatus;
use App\Models\Website;
use Illuminate\Http\Request;
use PhpParser\Node\Stmt\TryCatch;

class WebsiteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $websites = Website::all();

        return response()->json([
            'websites' => $websites
        ]);
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

        $input = $request->validate([
            'url' => 'required|url',
        ]);

        // get the authenticated user from the token
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }
        $input['user_id'] = $user->id;

        $input['status'] = $input['status'] ?? 'unknown';

        $input['last_checked_at'] = $input['last_checked_at'] ?? null;

        $website = Website::create($input);

        CheckWebsiteStatus::dispatch($website);

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
    public function destroy($website_id)
    {
        try {
            $website = Website::findOrFail($website_id);
            $website->delete();

            return response()->json([
                'message' => 'Website deleted successfully',
                'deleted_id' => $website->id
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete website',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function checkNow(Website $website)
    {
        CheckWebsiteStatus::dispatch($website);
    }
}
