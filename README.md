# Teste FullStack

Rodrigo Lopes - dev front-end

## Executando
  Docker 
  ```
  docker compose up -d
  ```
  Backend
  ```
  cd backend
  composer install
  php artisan migrate
  php artisan serve
  ```
  Frontend
  ```
  cd frontend
  npm i
  npm run dev
  ```
  
## Notas & Objetivos
  Backend será feito com php (laravel ^9.0) e mysql para o db
  Frontend com react pelo vite (pois é limpo para uma aplicação pequena e bem modelavel conforme meu gosto)
  ChatGPT gerou um json com alguns exemplo de musica do respectivo grupo proposto (não conheço o grupo então estou tomando como verdade os dados que o gpt gerou pois é só um mocha)

  ##### A fazer:
  - [ x ] Ver lista de álbuns e faixas
  - [ ] Pesquisar álbuns e faixas por nome
  - [ x ] Adicionar um novo álbum
  - [ x ] Adicionar uma nova faixa em um álbum
  - [ x ] Excluir uma faixa
  - [ x ] Excluir um álbum (respectivamente exclui todas as faixas)