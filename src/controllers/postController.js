import { getTodosPosts,  criar_post, atualizar_post} from "../models/posModels.js";
import fs from "fs"
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listar_Posts(req, res) {
    // Busca todos os posts do banco de dados
    const posts = await getTodosPosts();

    // Retorna os posts em formato JSON com status 200 (sucesso)
    res.status(200).json(posts);
}

export async function postar_novo_post(req, res) {
    const novo_post = req.body;
    try {
        // Insere o novo post no banco de dados
        const post_criado = await criar_post(novo_post);
        res.status(200).json(post_criado);
    }
    catch (erro) {
        console.error(erro.message);
        res.status(500).json({ error: "Falha ao inserir o post" });
    }
}

export async function  upload_imagen(req, res) {
    const novo_post = {
        descricao: "",
        img_url: req.file.originalname,
        alt: ""
    };
    try {
        // Insere o novo post no banco de dados
        const post_criado = await criar_post(novo_post);
        const image_tualizada = `uploads/${post_criado.insertedId}.png`;
        fs.renameSync(req.file.path, image_tualizada);
        res.status(200).json(post_criado);
    }
    catch (erro) {
        console.error(erro.message);
        res.status(500).json({ error: "Falha ao inserir o post" });
    }
}



export async function atualizar_novo_post(req, res) {
    const id = req.params.id;
    const url_imagem = `http://localhost:3000/${id}.png`

        
    try {
        // Insere o novo post no banco de dados
        const image_buffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(image_buffer)
        const novo_post = {
            descricao: descricao,
            img_url: url_imagem,
            alt: req.body.alt
        }

        const post_criado = await atualizar_post(id, novo_post);
        res.status(200).json(post_criado);
    }
    catch (erro) {
        console.error(erro.message);
        res.status(500).json({ error: "Falha ao inserir o post" });
    }
}
