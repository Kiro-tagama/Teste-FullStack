<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Album;

class AlbumSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $albums = [
            [
                'title' => 'Boiadeiro Punho de Aço',
                'year' => 1957,
                'cover_url' => 'url_para_a_imagem_1.jpg',
            ],
            [
                'title' => 'Nossa Senhora da Conceição',
                'year' => 1960,
                'cover_url' => 'url_para_a_imagem_2.jpg',
            ],
            [
                'title' => 'O Mineiro e o Italiano',
                'year' => 1963,
                'cover_url' => 'url_para_a_imagem_3.jpg',
            ],
        ];

        foreach ($albums as $albumData) {
            $album = Album::create($albumData);

            // Adicione as músicas para este álbum
            $this->addSongs($album);
        }
    }

    private function addSongs($album)
    {
        $songs = [];
        switch ($album->title) {
            case 'Boiadeiro Punho de Aço':
                $songs = [
                    'Boiadeiro Punho de Aço',
                    'Luar do Sertão',
                    'Flor do Cafezal',
                    'Rio de Lágrimas',
                    'Beijinho Doce',
                ];
                break;
            case 'Nossa Senhora da Conceição':
                $songs = [
                    'Nossa Senhora da Conceição',
                    'Saudade de Minha Terra',
                    'Paineira Velha',
                ];
                break;
            case 'O Mineiro e o Italiano':
                $songs = [
                    'O Mineiro e o Italiano',
                    'Pai João',
                    'Pagode em Brasília',
                ];
                break;
        }

        foreach ($songs as $songTitle) {
            $album->songs()->create(['title' => $songTitle]);
        }
    }
}

