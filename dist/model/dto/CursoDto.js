"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoDTO = void 0;
class CursoDTO {
    constructor(nome, id) {
        this.id = id !== null && id !== void 0 ? id : 0;
        this.nome = nome;
    }
}
exports.CursoDTO = CursoDTO;
