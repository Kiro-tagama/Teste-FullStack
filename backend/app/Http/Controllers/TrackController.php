<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Album;
use App\Models\Track;
use Illuminate\Support\Facades\Validator;

class TrackController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'album_id' => 'required|exists:albums,id',
            'title' => 'required|max:255',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        $validated = $validator->validated();
    
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

    public function getAll()
    {
        $track = Track::all();

        if ($track->isEmpty()) {
            return response()->json(['message' => 'Não há nenhum faixa no momento.'], 404);
        } else {
            return response()->json($track, 200);
        }
    }

    public function remove(Request $request, $id){
        if (!is_numeric($id)) {
            return response()->json(['message' => 'O ID da faixa deve ser um número inteiro.'], 400);
        }

        $track = Track::find($id);
        if (!$track) {
            return response()->json(['message' => 'Faixa não encontrada.'], 404);
        }

        $track->delete();
        return response()->json(['message' => 'Faixa removida com sucesso.'], 200);
    }
}
