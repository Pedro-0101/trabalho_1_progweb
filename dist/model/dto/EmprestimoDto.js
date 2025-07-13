"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoDTO = void 0;
class EmprestimoDTO {
    constructor(usuarioId, estoqueId, dataEmprestimo, dataDevolucao, dataEntrega = null, diasAtraso = null, suspensaoAte = null, id) {
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
exports.EmprestimoDTO = EmprestimoDTO;
