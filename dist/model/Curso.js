"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Curso = void 0;
class Curso {
    constructor(id, nome) {
        this.id = id; // Espera recever id valido (service)
        this.nome = nome; // Espera receber uma string não vazia maior que 3 caracteres (service)
    }
}
exports.Curso = Curso;
