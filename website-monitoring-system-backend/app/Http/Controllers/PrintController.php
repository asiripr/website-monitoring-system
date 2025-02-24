<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PrintController extends Controller
{
    public function showMessage()
    {
        return response()->json([
            'message' => 'Hello, Laravel is working perfectly!'
        ]);
    }
}
