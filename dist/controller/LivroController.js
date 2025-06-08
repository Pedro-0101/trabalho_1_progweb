"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroController = void 0;
const LivroService_1 = require("../service/LivroService");
class LivroController {
    constructor() {
        this.LivroService = new LivroService_1.LivroService();
    }
    adicionarLivro(req) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    listarLivrosFiltro(req) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    detalhesLivro(isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const livro = this.LivroService.detalhesLivro(isbn);
                return livro;
            }
            catch (error) {
                throw new Error("Erro ao requisitar detalhes do livro");
            }
        });
    }
    atualizarLivro(req) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    deletarLivro(isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.LivroService.deletarLivro(isbn);
            }
            catch (error) {
                throw new Error("Erro ao deletar livro");
            }
        });
    }
}
exports.LivroController = LivroController;
