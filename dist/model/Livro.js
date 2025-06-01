"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Livro = void 0;
class Livro {
    constructor(id, titulo, autor, editora, edicao, isbn, categoriaId) {
        this.id = id; // Espera receber um número inteiro maior que 0 (service)
        this.titulo = titulo; // Espera receber uma string não vazia maior que 3 caracteres (service)
        this.autor = autor; // Espera receber uma string não vazia maior que 3 caracteres (service)
        this.editora = editora; // Espera receber uma string não vazia maior que 3 caracteres (service)
        this.edicao = edicao; // Espera receber uma string não vazia maior que 3 caracteres (service)
        this.isbn = isbn; // Espera receber uma string não vazia no formato correto (service)
        this.categoriaId = categoriaId; // Validar se a categoria existe no sistema (service)
    }
}
exports.Livro = Livro;
