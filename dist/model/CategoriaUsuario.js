"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuario = void 0;
class CategoriaUsuario {
    constructor(id, nome) {
        this.id = id; // Atribui o ID da categoria, validacao realizada no service
        this.nome = nome; // Atribui o nome da categoria, validacao realizada no service
    }
}
exports.CategoriaUsuario = CategoriaUsuario;
