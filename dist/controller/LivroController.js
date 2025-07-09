"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroController = void 0;
const LivroService_1 = require("../service/LivroService");
class LivroController {
    constructor() {
        this.LivroService = new LivroService_1.LivroService();
    }
    adicionarLivro(req) {
        try {
            const titulo = req.body.titulo;
            const autor = req.body.autor;
            const editora = req.body.editora;
            const edicao = req.body.edicao;
            const isbn = req.body.isbn;
            const categoriaId = Number(req.body.categoriaId);
            const livroCriado = this.LivroService.criarLivro(titulo, autor, editora, edicao, isbn, categoriaId);
            return livroCriado;
        }
        catch (error) {
            throw new Error('Erro ao cadastrar novo livro');
        }
    }
    listarLivrosFiltro(req) {
        try {
            const filtroAutor = req.body.autor;
            const filtroEditora = req.body.editora;
            const filtroCategoria = req.body.categoriaId;
            const listaLivros = this.LivroService.ListarLivrosFiltro(filtroAutor, filtroEditora, filtroCategoria);
            return listaLivros;
        }
        catch (error) {
            throw new Error('Erro ao listar livros com filtro');
        }
    }
    detalhesLivro(isbn) {
        try {
            const livro = this.LivroService.detalhesLivro(isbn);
            return livro;
        }
        catch (error) {
            throw new Error("Erro ao requisitar detalhes do livro");
        }
    }
    atualizarLivro(req) {
        try {
            const titulo = req.body.titulo;
            const autor = req.body.autor;
            const editora = req.body.editora;
            const edicao = req.body.edicao;
            const isbn = req.body.isbn;
            const categoriaId = Number(req.body.categoriaId);
            const livroAtualizado = this.LivroService.atualizarLivro(titulo, autor, editora, edicao, isbn, categoriaId);
            return livroAtualizado;
        }
        catch (error) {
            throw new Error("Erro ao atualizar informacoes do livro");
        }
    }
    deletarLivro(isbn) {
        try {
            this.LivroService.deletarLivro(isbn);
        }
        catch (error) {
            throw new Error("Erro ao deletar livro");
        }
    }
}
exports.LivroController = LivroController;
