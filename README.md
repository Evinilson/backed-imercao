# backed-imercao

## Pré-requisitos
- **Node.js** 14 ou superior
- **MongoDB** acessível (local ou em nuvem)
- Variáveis de ambiente configuradas:
  - `STRING_CONECTION` – string de conexão do MongoDB
  - `GEMINI_API_KEY` – chave para uso do Gemini AI

## Instalação
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Execute o projeto em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

## Rotas disponíveis
- `GET /posts` – lista todos os posts
- `POST /posts` – cria um novo post
- `POST /upload` – faz upload de uma imagem (campo `imagem`)
- `PUT /upload/:id` – atualiza um post com base no ID fornecido

