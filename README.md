# Teste FullStack

Rodrigo Lopes - dev front-end

## Executando
  Docker 
  ```
  docker compose up -d
  ```
  Backend
  obs: lembre-se de criar um arquivo .env no caso pode só copiar o exemplo e renomear
  ```
  cd backend
  composer install
  php artisan serve
  ```
  Frontend
  ```
  cd frontend
  npm i
  npm run dev
  ```
## Uso da API
  url base - `http://127.0.0.1:8000/api`

  Para os albuns 
  - `/albums` os métodos `GET` `POST`
  - `/albums/{id}` os métodos `DELETE`, o id deve ser um número inteiro
  ```json
    {
      "title": "title",
      "year": 1957,
      "cover_url":"https://via.placeholder.com/150"
    }
  ```

  Para as faixas 
  - `/tracks` os métodos `GET` `POST`
  - `/tracks/{id}` os métodos `DELETE`, o id deve ser um número inteiro
  ```json
    {
      "album_id": 2,
      "title": "title"
    }
  ```

  Pesquisa por nome
  - `/findPerName/{name}` o métodos `GET`
  ```json
    {
      "albums": [],
      "tracks": []
    }
  ```

## Notas & Objetivos
  Backend será feito com php (laravel ^9.0) e mysql para o db
  Frontend com react pelo vite (pois é limpo para uma aplicação pequena e bem modelavel conforme meu gosto)
  ChatGPT gerou um json com alguns exemplo de musica do respectivo grupo proposto (não conheço o grupo então estou tomando como verdade os dados que o gpt gerou pois é só um mocha)

  ##### A fazer:
  - [x] Ver lista de álbuns e faixas
  - [x] Pesquisar álbuns e faixas por nome
  - [x] Adicionar um novo álbum
  - [x] Adicionar uma nova faixa em um álbum
  - [x] Excluir uma faixa
  - [x] Excluir um álbum (respectivamente exclui todas as faixas)
