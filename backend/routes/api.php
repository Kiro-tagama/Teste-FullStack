<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AlbumController;
use App\Http\Controllers\TrackController;

Route::get('/', function () {
    return response()->json(['message' => 'server on'], 200);
});

Route::get('/allAlbums', [AlbumController::class, 'getAllAlbums']);
Route::get('/allTracks', [TrackController::class, 'getAllTracks']);

Route::post('/addAlbum', [AlbumController::class, 'store']);
Route::post('/addTrack', [TrackController::class, 'store']);

/*
 Route::get('/allAlbums')
 Route::get('/allTracks')
 Route::get('/albumTracks') //faixas do album
 route::get('/findPerName')
 
 Route::delete('/deleteAlbum')
 Route::delete('/deleteTrack')
*/