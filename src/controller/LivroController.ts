import { LivroService } from "../service/LivroService";
import { Livro } from "../model/Livro";
import { Request, Response } from "express";
import { promises } from "dns";

export class LivroController{
    private LivroService : LivroService;

    constructor(){
        this.LivroService = new LivroService();
    }

    public async adicionarLivro(req: Request): Promise<Livro | null> {

        try{

            const titulo = req.body.titulo;
            const autor = req.body.autor;
            const editora = req.body.editora;
            const edicao = req.body.edicao; 
            const isbn = req.body.isbn;
            const categoriaId = Number(req.body.categoriaId);
            
            const livroCriado = this.LivroService.criarLivro(titulo, autor, editora, edicao, isbn, categoriaId);
            return livroCriado;
        } catch (error) {
            throw new Error('Erro ao cadastrar novo livro');
        }
    }

    
}