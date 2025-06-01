"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioService = void 0;
const CategoriaUsuario_1 = require("../model/CategoriaUsuario");
const CategoriaUsuarioRepository_1 = require("../repository/CategoriaUsuarioRepository");
class CategoriaUsuarioService {
    constructor() {
        this.categoriaUsuarioRepository = CategoriaUsuarioRepository_1.CategoriaUsuarioRepository.getInstance();
    }
    criarCategoriaUsuario(nome) {
        // Valida o nome da categoria
        if (!nome || nome.trim() === "" || nome.length < 3) {
            throw new Error("O nome da categoria deve ter mais de 3 caracteres válidos.");
        }
        // Remove espaços em branco extras e capitaliza a primeira letra
        nome = nome.trim();
        nome = nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
        // Verifica se a categoria já existe
        let categoriaExistente = this.categoriaUsuarioRepository.getListaCategoriasUsuarios().find(categoria => categoria.nome === nome);
        if (categoriaExistente) {
            throw new Error("Categoria já existe.");
        }
        // Cria uma nova categoria com um ID único
        let id = this.categoriaUsuarioRepository.getListaCategoriasUsuarios().length + 1;
        let categoriaUsuario = new CategoriaUsuario_1.CategoriaUsuario(id, nome);
        // Verifica se a categoria foi criada corretamente
        if (!categoriaUsuario) {
            throw new Error("Erro ao criar a categoria.");
        }
        // Adiciona a categoria ao repositório
        this.categoriaUsuarioRepository.addCategoriaUsuario(categoriaUsuario);
        // Retorna a categoria criada
        return categoriaUsuario;
    }
    listarCategoriasUsuarios() {
        // Retorna a lista de categorias de usuário
        return this.categoriaUsuarioRepository.getListaCategoriasUsuarios();
    }
}
exports.CategoriaUsuarioService = CategoriaUsuarioService;
