"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroDTO = void 0;
class LivroDTO {
    constructor(titulo, autor, editora, edicao, isbn, categoriaId, id) {
        this.id = id !== null && id !== void 0 ? id : 0;
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.edicao = edicao;
        this.isbn = isbn;
        this.categoriaId = categoriaId;
    }
}
exports.LivroDTO = LivroDTO;
