"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroDTO = void 0;
class CategoriaLivroDTO {
    constructor(nome, id) {
        this.id = id !== null && id !== void 0 ? id : 0;
        this.nome = nome;
    }
}
exports.CategoriaLivroDTO = CategoriaLivroDTO;
