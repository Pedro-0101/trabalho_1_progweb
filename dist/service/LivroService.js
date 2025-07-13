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
            const livroRepetidoIsbn = yield this.getLivroByIsbn(livro.isbn);
            if (livroRepetidoIsbn)
                throw new Error(`O livro com ISBN ${livro.isbn} já foi incluído.`);
            // Verifica se existe livro com mesma combinação de autor, edição e editora
            const livroRepetidoAEE = yield this.getLivroAEE(livro.autor, livro.editora, livro.edicao);
            if (livroRepetidoAEE)
                throw new Error(`O livro com autor ${livro.autor}, editora ${livro.editora} e edição ${livro.edicao} já foi incluído.`);
            // Verifica se existe categoria de livro
            const existeCategoria = yield this.categoriaLivroService.getCategoriaLivroById(livro.categoriaId);
            if (!existeCategoria)
                throw new Error('Categoria de livro inválida.');
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
            return yield this.livroRepository.getLivroByIsbn(isbn);
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
    getLivros(autor, editora, categoriaId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.livroRepository.getLivros(autor, editora, categoriaId);
        });
    }
    atualizarLivro(titulo, autor, editora, edicao, isbn, categoriaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const livro = yield new Livro_1.Livro(titulo, autor, editora, edicao, isbn, categoriaId);
            // Verifica se existe categoria de livro
            const existeCategoria = yield this.categoriaLivroService.getCategoriaLivroById(livro.categoriaId);
            if (!existeCategoria)
                throw new Error('Categoria de livro inválida.');
            return yield this.livroRepository.atualizarLivro(livro.titulo, livro.autor, livro.editora, livro.edicao, livro.isbn, livro.categoriaId);
        });
    }
    deletarLivro(isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            const livro = yield this.getLivroByIsbn(isbn.trim());
            if (!livro)
                throw new Error(`Livro com o isbn ${isbn} nao encontrado`);
            return yield this.livroRepository.deletarLivro(livro.isbn);
        });
    }
}
exports.LivroService = LivroService;
