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
        // Valida o nome da categoria
        if (!nome || nome.trim() === "" || nome.length < 3) {
            throw new Error("O nome da categoria deve ter mais de 3 caracteres validos.");
        }
        // Remove espaços em branco extras e capitaliza a primeira letra
        nome = nome.trim();
        nome = nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase(); // Capitaliza a primeira letra e deixa o resto em minúsculas
        // Verifica se a categoria já existe
        let categoriaExistente = this.CategoriaLivroRepository.getListaCategoriasLivros().find(categoria => categoria.nome === nome);
        if (categoriaExistente) {
            throw new Error("Categoria já existe.");
        }
        // Cria uma nova categoria com um ID único
        let id = this.CategoriaLivroRepository.getListaCategoriasLivros().length + 1;
        let categoriaLivro = new CategoriaLivro_1.CategoriaLivro(id, nome);
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
