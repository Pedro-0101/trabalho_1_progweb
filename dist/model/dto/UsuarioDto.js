"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioDTO = void 0;
class UsuarioDTO {
    constructor(nome, cpf, ativo, categoriaId, cursoId, id) {
        this.id = id !== null && id !== void 0 ? id : 0;
        this.nome = nome;
        this.cpf = cpf;
        this.ativo = ativo;
        this.categoriaId = categoriaId;
        this.cursoId = cursoId;
    }
}
exports.UsuarioDTO = UsuarioDTO;
