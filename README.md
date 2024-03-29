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
  php artisan serve
  ```
  Frontend
  ```
  cd frontend
  npm i
  npm run dev
  ```
  
## Notas & Objetivos
  ##### Estou usando o codespace do github por isso as respectivas versões
  
  Backend será feito com php 8.0.30 (laravel ^9.0) e socker para o db
  Frontend com react pelo vite (pois é limpo para uma aplicação pequena e bem modelavel conforme meu gosto)
  ChatGPT gerou um json com alguns exemplo de musica do respectivo grupo proposto (não conheço o grupo então estou tomando como verdade os dados que o gpt gerou pois é só um mocha)

  ##### A fazer:
  - [ ] Ver lista de álbuns e faixas
  - [ ] Pesquisar álbuns e faixas por nome
  - [ ] Adicionar um novo álbum
  - [ ] Adicionar uma nova faixa em um álbum
  - [ ] Excluir uma faixa
  - [ ] Excluir um álbum (respectivamente exclui todas as faixas)