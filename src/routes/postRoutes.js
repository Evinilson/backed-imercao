import express from 'express';
import { atualizar_novo_post, listar_Posts, postar_novo_post, upload_imagen } from '../controllers/postController.js';
import multer from 'multer';
import cors from 'cors';

const corsOptions = {
    origen: "http://localhost:8000",
    optionsSuccessStatus: 200
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ dest: './uploads', storage});

const routes =  (app) => {
    // Middleware para habilitar o uso de JSON nas requisições e respostas
    app.use(express.json());

    app.use(cors(corsOptions));

    // Define uma rota GET para "/posts" para retornar todos os posts
    app.get("/posts", listar_Posts);

    // Rota para criar Post
    app.post("/posts", postar_novo_post)

    app.post("/upload", upload.single("imagem"), upload_imagen)

    app.put("/upload/:id", atualizar_novo_post)
}

export default routes;