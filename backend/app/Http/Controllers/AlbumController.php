<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Album;
use App\Models\Track;
use Illuminate\Support\Facades\Validator;

class AlbumController extends Controller
{
    public function getAll()
    {
        $albums = Album::all();

        if ($albums->isEmpty()) {
            return response()->json(['message' => 'Não há nenhum álbum no momento.'], 404);
        } else {
            return response()->json($albums, 200);
        }
    }

    public function store(Request $request)
    {
        $validator = $request->validate([
            'title' => 'required|max:255',
            'year' => 'required|integer',
            'cover_url' => 'required|url',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $existingAlbum = Album::where('title', $validated['title'])->first();

        if ($existingAlbum) {
            return response()->json(['message' => 'Já existe um álbum com este título.'], 422);
        } else {
            $album = Album::create($validated);
            return response()->json($album, 201);
        }
    }

    public function remove(Request $request, $id)
    {
        // Verifique se o ID é numérico
        if (!is_numeric($id)) {
            return response()->json(['message' => 'O ID do álbum deve ser um número inteiro.'], 400);
        }

        // Encontre o álbum pelo ID
        $album = Album::find($id);

        // Verifique se o álbum foi encontrado
        if (!$album) {
            return response()->json(['message' => 'Álbum não encontrado.'], 404);
        }

        // Remova todas as faixas associadas ao álbum
        $album->tracks()->delete();

        // Remova o álbum
        $album->delete();

        return response()->json(['message' => 'Álbum e todas as suas faixas foram removidos com sucesso.'], 200);
    }

}
