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
exports.LivroService = void 0;
const Livro_1 = require("../model/entity/Livro");
const LivroRepository_1 = require("../repository/LivroRepository");
const CategoriaLivroService_1 = require("./CategoriaLivroService");
class LivroService {
    constructor() {
        this.livroRepository = LivroRepository_1.LivroRepository.getInstance();
        this.categoriaLivroService = new CategoriaLivroService_1.CategoriaLivroService();
    }
    validarLivro(titulo, autor, editora, edicao, isbn, categoriaId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Instância para validação e formatação
            const livro = new Livro_1.Livro(titulo, autor, editora, edicao, isbn, categoriaId);
            // Verifica se existe livro com mesmo isbn
            const livroReptidoIsbn = yield this.getLivroByIsbn(livro.isbn);
            if (livroReptidoIsbn)
                throw new Error(`O livro ${livro.titulo} ja foi incluido.`);
            // Verifica se existe livro com mesma combinacao de autor, edicao e editora
            const livroRepetidoAEE = yield this.getLivroAEE(livro.autor, livro.editora, livro.edicao);
            if (livroRepetidoAEE)
                throw new Error(`O livro ${livro.titulo} ja foi incluido.`);
            // Verifica se existe categoria de livro
            const existeCategoria = yield this.categoriaLivroService.getCategoriaLivroById(livro.categoriaId);
            if (!existeCategoria)
                throw new Error('Categoria de livro invalida');
            return livro;
        });
    }
    criarLivro(titulo, autor, editora, edicao, isbn, categoriaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const livroTemp = yield this.validarLivro(titulo, autor, editora, edicao, isbn, categoriaId);
            // Persiste e obtém o ID gerado
            const id = yield this.livroRepository.insertLivro(livroTemp);
            // Retorna nova instância com ID preenchido
            return new Livro_1.Livro(titulo, autor, editora, edicao, isbn, categoriaId, id);
        });
    }
    getLivroByIsbn(isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            const livro = yield this.livroRepository.getLivroByIsbn(isbn);
            if (!livro)
                throw new Error(`Livro com ISBN ${isbn} não encontrado.`);
            return livro;
        });
    }
    getLivroById(livroId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!livroId)
                throw new Error('Id do livro invalido.');
            return this.livroRepository.getLivroById(livroId);
        });
    }
    getLivroAEE(autor, editora, edicao) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!autor || !editora || !edicao)
                throw new Error('Erro ao consultar repeticao de livro.');
            return yield this.livroRepository.getLivroAEE(autor, editora, edicao);
        });
    }
    getLivros() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.livroRepository.getLivros();
        });
    }
    atualizarLivro(titulo, autor, editora, edicao, isbn, categoriaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const livro = yield this.validarLivro(titulo, autor, editora, edicao, isbn, categoriaId);
            return yield this.livroRepository.atualizarLivro(livro.titulo, livro.autor, livro.editora, livro.edicao, livro.isbn, livro.categoriaId);
        });
    }
    deletarLivro(isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            const livro = yield this.getLivroByIsbn(isbn);
            return yield this.deletarLivro(livro.isbn);
        });
    }
}
exports.LivroService = LivroService;
