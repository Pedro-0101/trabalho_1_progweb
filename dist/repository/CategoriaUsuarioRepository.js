"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioRepository = void 0;
class CategoriaUsuarioRepository {
    constructor() {
        this.listaCategoriasUsuarios = [];
    }
    static getInstance() {
        if (!CategoriaUsuarioRepository.instance) {
            CategoriaUsuarioRepository.instance = new CategoriaUsuarioRepository();
        }
        return CategoriaUsuarioRepository.instance;
    }
    getListaCategoriasUsuarios() {
        return this.listaCategoriasUsuarios;
    }
    addCategoriaUsuario(categoria) {
        this.listaCategoriasUsuarios.push(categoria);
    }
    getCategoriaUsuarioById(id) {
        return this.listaCategoriasUsuarios.find(categoria => categoria.id === id);
    }
}
exports.CategoriaUsuarioRepository = CategoriaUsuarioRepository;
