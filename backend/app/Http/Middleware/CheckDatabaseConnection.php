<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\DB;

class CheckDatabaseConnection
{
    public function handle($request, Closure $next)
    {
        try {
            DB::connection()->getPdo();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Could not connect to the database.'], 500);
        }

        return $next($request);
    }
}
