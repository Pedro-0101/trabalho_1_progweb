"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivro = void 0;
const CategoriaLivroRepository_1 = require("../repository/CategoriaLivroRepository");
class CategoriaLivro {
    constructor(nome) {
        this.CategoriaLivroRepository = CategoriaLivroRepository_1.CategoriaLivroRepository.getInstance();
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
        this.id = id;
        this.nome = nome;
    }
}
exports.CategoriaLivro = CategoriaLivro;
