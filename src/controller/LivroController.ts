import { LivroService } from "../service/LivroService";
import { Livro } from "../model/Livro";
import { Request, Response } from "express";

export class LivroController{
    private LivroService : LivroService;

    constructor(){
        this.LivroService = new LivroService();
    }

    public adicionarLivro(req: Request): Livro | null {

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

public listarLivrosFiltro(req: Request): Livro[] | null {

        try{

            const filtroAutor = req.body.autor;
            const filtroEditora = req.body.editora;
            const filtroCategoria = req.body.categoriaId;

            const listaLivros = this.LivroService.ListarLivrosFiltro(filtroAutor, filtroEditora, filtroCategoria);
            return listaLivros;
        }catch(error){
            throw new Error('Erro ao listar livros com filtro')
        }

    }

    public detalhesLivro(isbn: string): Livro | null{
        
        try{

            const livro = this.LivroService.detalhesLivro(isbn);
            return livro;

        }catch(error){
            throw new Error("Erro ao requisitar detalhes do livro")
        }

    }

    public atualizarLivro(req: Request): Livro | null{

        try{

            const titulo = req.body.titulo;
            const autor = req.body.autor;
            const editora = req.body.editora;
            const edicao = req.body.edicao; 
            const isbn = req.body.isbn;
            const categoriaId = Number(req.body.categoriaId);

            const livroAtualizado = this.LivroService.atualizarLivro(titulo, autor, editora, edicao, isbn, categoriaId);

            return livroAtualizado;
            
        }catch(error){
            throw new Error("Erro ao atualizar informacoes do livro")
        }
    }

    public deletarLivro(isbn: string): void{

        try{

            this.LivroService.deletarLivro(isbn);

        }catch(error){
            throw new Error("Erro ao deletar livro");
        }

    }
}