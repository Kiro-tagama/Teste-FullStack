<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Album;

class AlbumController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'year' => 'required|integer',
            'cover_image' => 'required|url',
        ]);

        $existingAlbum = Album::where('title', $validated['title'])->first();

        if ($existingAlbum) {
            return response()->json(['message' => 'Já existe um álbum com este título.'], 422);
        } else{
            $album = Album::create($validated);
            return response()->json($album, 201);
        }

    }

    public function getAllAlbums()
    {
        $albums = Album::all();

        if ($albums->isEmpty()) {
            return response()->json(['message' => 'Não há nenhum álbum no momento.'], 404);
        } else {
            return response()->json($albums, 200);
        }
    }

}
