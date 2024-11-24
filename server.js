// Importa o módulo Express para criar e gerenciar o servidor web
import express from 'express';
import routes from './src/routes/postRoutes.js';

// Inicializa o aplicativo Express
const app = express();
app.use(express.static("uploads"));
// 
routes(app)

// Inicia o servidor na porta 3000 e exibe uma mensagem no console com a URL
app.listen(3000, () => {
    console.log('listening on port http://localhost:3000');
});

