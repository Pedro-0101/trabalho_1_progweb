"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
class UsuarioRepository {
    constructor() {
        this.listaUsuarios = [];
    }
    static getInstance() {
        if (!UsuarioRepository.instance) {
            UsuarioRepository.instance = new UsuarioRepository();
        }
        return UsuarioRepository.instance;
    }
    getListaUsuarios() {
        return this.listaUsuarios;
    }
    addUsuario(usuario) {
        this.listaUsuarios.push(usuario);
    }
    getUsuarioById(id) {
        return this.listaUsuarios.find(usuario => usuario.id === id);
    }
}
exports.UsuarioRepository = UsuarioRepository;
