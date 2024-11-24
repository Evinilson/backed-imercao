import 'dotenv/config'
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Realiza a conexão com o banco de dados usando a string de conexão armazenada no ambiente
const conction = await conectarAoBanco(process.env.STRING_CONECTION);

/**
 * Função para buscar todos os posts da coleção no banco de dados.
 * @returns {Promise<Array>} - Retorna uma lista de posts armazenados no banco de dados.
 */
export async function getTodosPosts() {
    // Obtém a referência ao banco de dados chamado "mersao-instabyrtes"
    const db = conction.db("mersao-instabyrtes");
    // Obtém a referência à coleção "posts"
    const colecao = db.collection("posts");
    // Busca todos os documentos na coleção e os retorna como um array
    return colecao.find().toArray();
}


export async function criar_post(novo_post) {
    // Obtém a referência ao banco de dados chamado "mersao-instabyrtes"
    const db = conction.db("mersao-instabyrtes");
    // Obtém a referência à coleção "posts"
    const colecao = db.collection("posts");

    return colecao.insertOne(novo_post);
}



export async function atualizar_post(id, novo_post) {
    // Obtém a referência ao banco de dados chamado "mersao-instabyrtes"
    const db = conction.db("mersao-instabyrtes");
    // Obtém a referência à coleção "posts"
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set: novo_post});
}
