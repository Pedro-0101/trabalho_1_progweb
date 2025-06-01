"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivro = void 0;
class CategoriaLivro {
    constructor(id, nome) {
        this.id = id; // Atribui o ID da categoria, validacao realizada no service
        this.nome = nome; // Atribui o nome da categoria, validacao realizada no service
    }
}
exports.CategoriaLivro = CategoriaLivro;
