"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Livro = void 0;
const textUtil_1 = require("../../utils/textUtil");
class Livro {
    constructor(titulo, autor, editora, edicao, isbn, categoriaId, id) {
        titulo = textUtil_1.textUtils.capitalizarTexto(titulo);
        autor = textUtil_1.textUtils.capitalizarTexto(autor);
        editora = textUtil_1.textUtils.capitalizarTexto(editora);
        edicao = textUtil_1.textUtils.capitalizarTexto(edicao);
        isbn = isbn.trim().replace(/[^0-9]/g, "");
        if (!titulo || titulo.length < 3) {
            throw new Error("Título inválido. Deve ter pelo menos 3 caracteres.");
        }
        if (!autor || autor.length < 3) {
            throw new Error("Autor inválido. Deve ter pelo menos 3 caracteres.");
        }
        if (!editora || editora.length < 3) {
            throw new Error("Editora inválida. Deve ter pelo menos 3 caracteres.");
        }
        if (!edicao || edicao.length < 3) {
            throw new Error("Edição inválida. Deve ter pelo menos 3 caracteres.");
        }
        if (!isbn || isbn.length < 13) {
            throw new Error("ISBN inválido. Deve ter pelo menos 13 caracteres.");
        }
        this.id = id !== null && id !== void 0 ? id : 0;
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.edicao = edicao;
        this.isbn = isbn;
        this.categoriaId = categoriaId;
    }
}
exports.Livro = Livro;
