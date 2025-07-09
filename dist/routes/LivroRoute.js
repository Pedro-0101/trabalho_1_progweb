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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LivroController_1 = require("../controller/LivroController");
const express_1 = __importDefault(require("express"));
let router = express_1.default.Router();
/**
* POST / - Adiciona novo livro ao acervo
    *Campos obrigatórios: título, ISBN, autor, editora, edição, categoria.
* GET / - Lista todos os livros (com filtros).
* GET /:isbn - Mostra detalhes de um livro.
* PUT /:isbn - Atualiza informações do livro.
* DELETE /:isbn - Remove livro (se não estiver emprestado).
*/
// Rota para cadastrar um novo livro
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const livroController = new LivroController_1.LivroController();
    try {
        const novoLivro = livroController.adicionarLivro(req);
        res.status(201).json(novoLivro);
    }
    catch (error) {
        console.error('Erro ao adicionar livro:', error);
        res.status(500).json({ message: 'Erro ao adicionar livro', error });
    }
}));
// Rota para retornar lista de livros, com filtro(autor, editora, categoria)
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const livroController = new LivroController_1.LivroController();
        const filtros = req.query;
        const livros = livroController.listarLivrosFiltro(req);
        res.status(200).json(livros);
    }
    catch (error) {
        throw new Error("Erro ao listar livros com filtro");
    }
}));
// Rota para retornar detalhes de um livro
router.get('/:isbn', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const livroController = new LivroController_1.LivroController();
        const isbn = req.body.isbn;
        const livro = livroController.detalhesLivro(isbn);
        res.status(200).json(livro);
    }
    catch (error) {
        throw new Error("Erro ao requisitar detalhes do livro");
    }
}));
// Rota para atualizar informacoes de um livro
router.put('/:isbn', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const livroController = new LivroController_1.LivroController();
        const livroAtualizado = livroController.atualizarLivro(req);
        res.status(200).json(livroAtualizado);
    }
    catch (error) {
        throw new Error("Erro ao atualizar informacoes do livro");
    }
}));
// Rota para excluir um livro se nao estiver emprestado
router.delete('/:isbn', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const livroController = new LivroController_1.LivroController();
        livroController.deletarLivro(req.body.isbn);
        res.status(200);
    }
    catch (error) {
        throw new Error("Erro ao deletar livro");
    }
}));
module.exports = router;
