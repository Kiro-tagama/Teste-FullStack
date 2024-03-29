<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Track;
use App\Models\Album;

class TrackController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'album_id' => 'required|exists:albums,id',
            'title' => 'required|max:255',
        ]);

        $album = Album::find($validated['album_id']);

        if (!$album) {
            return response()->json(['message' => 'Álbum não encontrado.'], 404);
        }

        $track = new Track();
        $track->title = $validated['title'];
        $track->album_id = $album->id;
        $track->save();

        return response()->json($track, 201); 
    }
}
