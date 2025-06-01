"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emprestimo = void 0;
class Emprestimo {
    constructor(id, usuarioId, estoqueId, dataEmprestimo, dataDevolucao, dataEntrega, diasAtraso, suspensaoAte) {
        this.id = id; // Espera receber um ID único para o empréstimo (service) 
        this.usuarioId = usuarioId; // Verificar se o usuário existe no sistema (service)
        this.estoqueId = estoqueId; // Verificar se o estoque existe no sistema (service)
        this.dataEmprestimo = dataEmprestimo; // Espera receber uma data válida de empréstimo (service)
        this.dataDevolucao = dataDevolucao; // Espera receber data posterior a data de empréstimo (service)
        this.dataEntrega = dataEntrega; // Inicialmente, deve ser nulo (service)
        this.diasAtraso = diasAtraso; // Inicialmente, deve ser 0 (service)
        this.suspensaoAte = suspensaoAte; // Inicialmente, deve ser nulo (service)
    }
}
exports.Emprestimo = Emprestimo;
