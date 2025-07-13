"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueDTO = void 0;
class EstoqueDTO {
    constructor(livroId, quantidade, disponivel, quantidadeEmprestada, id) {
        this.id = id !== null && id !== void 0 ? id : 0;
        this.livroId = livroId;
        this.quantidade = quantidade;
        this.quantidadeEmprestada = quantidadeEmprestada !== null && quantidadeEmprestada !== void 0 ? quantidadeEmprestada : 0;
        this.disponivel = disponivel;
    }
}
exports.EstoqueDTO = EstoqueDTO;
