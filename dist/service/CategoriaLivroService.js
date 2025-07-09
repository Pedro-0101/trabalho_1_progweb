"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroService = void 0;
const CategoriaLivro_1 = require("../model/CategoriaLivro");
const CategoriaLivroRepository_1 = require("../repository/CategoriaLivroRepository");
class CategoriaLivroService {
    constructor() {
        this.CategoriaLivroRepository = CategoriaLivroRepository_1.CategoriaLivroRepository.getInstance();
    }
    criarCategoriaLivro(nome) {
        let categoriaLivro = new CategoriaLivro_1.CategoriaLivro(nome);
        // Verifica se a categoria foi criada corretamente
        if (!categoriaLivro) {
            throw new Error("Erro ao criar a categoria.");
        }
        // Adiciona a categoria ao repositório
        this.CategoriaLivroRepository.addCategoriaLivro(categoriaLivro);
        // Retorna a categoria criada
        return categoriaLivro;
    }
    listarCategorias() {
        // Retorna todas as categorias
        return this.CategoriaLivroRepository.getListaCategoriasLivros();
    }
}
exports.CategoriaLivroService = CategoriaLivroService;
