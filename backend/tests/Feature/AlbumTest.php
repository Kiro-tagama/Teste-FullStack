<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use App\Models\Album;
use App\Models\Track;

class AlbumTest extends TestCase
{
    use DatabaseTransactions;

    public function test_create_albums_and_add_tracks()
{
    $albumsData = [
        [
            "title" => "Boiadeiro Punho de Aço",
            "year" => 1957,
            "cover_url" => "https://example.com/cover1.jpg",
            "tracks" => [
                "Boiadeiro Punho de Aço",
                "Luar do Sertão",
                "Flor do Cafezal",
                "Rio de Lágrimas",
                "Beijinho Doce"
            ]
        ],
        [
            "title" => "Nossa Senhora da Conceição",
            "year" => 1960,
            "cover_url" => "https://example.com/cover2.jpg",
            "tracks" => [
                "Nossa Senhora da Conceição",
                "Saudade de Minha Terra",
                "Paineira Velha"
            ]
        ],
        [
            "title" => "O Mineiro e o Italiano",
            "year" => 1963,
            "cover_url" => "https://example.com/cover3.jpg",
            "tracks" => [
                "O Mineiro e o Italiano",
                "Pai João",
                "Pagode em Brasília"
            ]
        ]
    ];

    foreach ($albumsData as $albumData) {
        $response = $this->postJson('/api/albums', [
            'title' => $albumData['title'],
            'year' => $albumData['year'],
            'cover_url' => $albumData['cover_url'],
        ]);

        $response->assertStatus(201);
        
        $this->assertDatabaseHas('albums', [
            'title' => $albumData['title'],
            'year' => $albumData['year'],
            'cover_url' => $albumData['cover_url'],
        ]);

        $albumId = $response->json('id');
        $this->assertNotNull($albumId);

        foreach ($albumData['tracks'] as $trackTitle) {
            $response = $this->postJson("/api/tracks", [
                'title' => $trackTitle,
                'album_id' => $albumId
            ]);

            $response->assertStatus(201);
        }
    }
}


    // public function test_remove_track_from_album()
    // {

    //     $album = Album::where('title', 'O Mineiro e o Italiano')->first();
    //     $this->assertNotNull($album);

    //     $track = $album->tracks()->first();
    //     $this->assertNotNull($track);

    //     $response = $this->deleteJson("/api/tracks/{$track->id}");
    //     $response->assertStatus(204);

    //     $this->assertCount(2, $album->tracks);

    //     $album->delete();

    //     $this->assertNull(Album::find($album->id));
    // }
}
