<?php

use App\Http\Controllers\AlbumController;
use App\Http\Controllers\TrackController;
use App\Models\Album;
use App\Models\Track;

Route::middleware(['check.db.connection'])->group(function () {
    Route::get('/', function () {
        return response()->json(['message' => 'server on'], 200);
    });

    Route::get('/albums', [AlbumController::class, 'getAll']);
    Route::get('/tracks', [TrackController::class, 'getAll']);

    Route::post('/albums', [AlbumController::class, 'store']);
    Route::post('/tracks', [TrackController::class, 'store']);

    Route::delete('/albums/{id}', [AlbumController::class, 'remove']);
    Route::delete('/tracks/{id}', [TrackController::class, 'remove']);
    
    Route::get('/findPerName/{name}', function ($name) {
        $albums = Album::where('title', 'like', "%$name%")->get();
        $tracks = Track::where('title', 'like', "%$name%")->get();
        
        return response()->json([
            'albums' => $albums->isEmpty() ? [] : $albums,
            'tracks' => $tracks->isEmpty() ? [] : $tracks,
        ]);
    });
});
