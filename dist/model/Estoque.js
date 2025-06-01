"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estoque = void 0;
class Estoque {
    constructor(id, livroId, quantidade, quantidadeEmprestada, disponivel) {
        this.id = id; // Espera receber um número inteiro maior que 0 (service)
        this.livroId = livroId; // Espera receber um ID de livro válido (service)
        this.quantidade = quantidade; // Espera receber um número inteiro maior ou igual a 0 (service)
        this.quantidadeEmprestada = quantidadeEmprestada; // Espera receber um número inteiro maior ou igual a 0 (service)
        this.disponivel = disponivel; // Espera receber um booleano (service)
    }
}
exports.Estoque = Estoque;
