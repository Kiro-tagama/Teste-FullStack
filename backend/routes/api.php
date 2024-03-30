<?php

use App\Http\Controllers\AlbumController;
use App\Http\Controllers\TrackController;

Route::middleware(['check.db.connection'])->group(function () {
    Route::get('/', function () {
        return response()->json(['message' => 'server on'], 200);
    });
    Route::post('/', function () {
        return response()->json(['message' => 'POST method supported for route /'], 200);
    });

    Route::get('/albums', [AlbumController::class, 'getAll']);
    Route::get('/tracks', [TrackController::class, 'getAll']);

    Route::post('/albums', [AlbumController::class, 'store']);
    Route::post('/tracks', [TrackController::class, 'store']);

    Route::delete('/albums/{id}', [AlbumController::class, 'remove']);
    Route::delete('/tracks/{id}', [TrackController::class, 'remove']);
    
    /*
     Route::get('/albumTracks/{id}') //faixas do album
     route::get('/findPerName/{id}') // vai encontrar o album ou musica
    */
});
