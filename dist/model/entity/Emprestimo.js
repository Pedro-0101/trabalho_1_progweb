"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emprestimo = void 0;
class Emprestimo {
    constructor(usuarioId, estoqueId, dataEmprestimo, dataDevolucao, dataEntrega = null, diasAtraso = null, suspensaoAte = null, id) {
        if (!(dataEmprestimo instanceof Date))
            throw new Error("dataEmprestimo inválida.");
        if (!(dataDevolucao instanceof Date))
            throw new Error("dataDevolucao inválida.");
        this.id = id !== null && id !== void 0 ? id : 0;
        this.usuarioId = usuarioId;
        this.estoqueId = estoqueId;
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolucao = dataDevolucao;
        this.dataEntrega = dataEntrega;
        this.diasAtraso = diasAtraso;
        this.suspensaoAte = suspensaoAte;
    }
}
exports.Emprestimo = Emprestimo;
