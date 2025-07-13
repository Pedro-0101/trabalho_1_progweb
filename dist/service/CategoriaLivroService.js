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
exports.CategoriaLivroService = void 0;
const CategoriaLivro_1 = require("../model/entity/CategoriaLivro");
const CategoriaLivroRepository_1 = require("../repository/CategoriaLivroRepository");
class CategoriaLivroService {
    constructor() {
        this.CategoriaLivroRepository = CategoriaLivroRepository_1.CategoriaLivroRepository.getInstance();
    }
    criarCategoriaLivro(nome) {
        return __awaiter(this, void 0, void 0, function* () {
            // Cria instância inicial para validação e consistência
            const categoriaTemp = new CategoriaLivro_1.CategoriaLivro(nome);
            // Persiste no banco e recebe o ID gerado
            const id = yield this.CategoriaLivroRepository.insertCategoriaLivro(categoriaTemp);
            // Retorna categoria de livro
            return new CategoriaLivro_1.CategoriaLivro(nome, id);
        });
    }
    getCategoriaLivroById(categoriaId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!categoriaId)
                throw new Error('Categoria de livro invalida.');
            return yield this.CategoriaLivroRepository.getCategoriaLivroById(categoriaId);
        });
    }
    getCategoriasLivro() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.CategoriaLivroRepository.getCategoriasLivro();
        });
    }
}
exports.CategoriaLivroService = CategoriaLivroService;
