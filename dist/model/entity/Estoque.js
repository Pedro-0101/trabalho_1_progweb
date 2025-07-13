"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estoque = void 0;
class Estoque {
    constructor(livroId, quantidade, disponivel, quantidadeEmprestada, id) {
        if (quantidade < 0) {
            throw new Error("Quantidade inválida. Deve ser maior ou igual a 0.");
        }
        this.id = id !== null && id !== void 0 ? id : 0;
        this.livroId = livroId;
        this.quantidade = quantidade;
        this.quantidadeEmprestada = quantidadeEmprestada !== null && quantidadeEmprestada !== void 0 ? quantidadeEmprestada : 0;
        this.disponivel = disponivel;
    }
}
exports.Estoque = Estoque;
