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
        let categoriaUsuario = new CategoriaUsuario_1.CategoriaUsuario(nome);
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
