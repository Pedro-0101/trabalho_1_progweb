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
    getUsuarioByCpf(cpf) {
        if (!cpf) {
            throw new Error("CPF invalido");
        }
        const usuario = this.getListaUsuarios().find(u => u.cpf === cpf);
        if (usuario) {
            return usuario;
        }
        else {
            throw new Error("Usuario nao encontrado");
        }
    }
    atualizaUsuario(nome, cpf, categoriaId, cursoId) {
        const usuario = this.getUsuarioByCpf(cpf);
        if (!usuario) {
            throw new Error("Erro ao atualizar usuario");
        }
        usuario.nome = nome;
        usuario.cpf = cpf;
        usuario.categoriaId = categoriaId;
        usuario.cursoId = cursoId;
        return usuario;
    }
    removeUsuario(cpf) {
        const usuario = this.getUsuarioByCpf(cpf);
        if (!usuario) {
            throw new Error("Erro ao remover usuario: Usuario nao encontrado");
        }
        const index = this.listaUsuarios.findIndex(u => u.cpf === cpf);
        this.listaUsuarios.splice(index, 1);
    }
}
exports.UsuarioRepository = UsuarioRepository;
