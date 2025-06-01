"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoRepository = void 0;
class EmprestimoRepository {
    constructor() {
        this.listaEmprestimos = [];
    }
    static getInstance() {
        if (!EmprestimoRepository.instance) {
            EmprestimoRepository.instance = new EmprestimoRepository();
        }
        return EmprestimoRepository.instance;
    }
    getListaEmprestimos() {
        return this.listaEmprestimos;
    }
    addEmprestimo(emprestimo) {
        this.listaEmprestimos.push(emprestimo);
    }
    getEmprestimoById(id) {
        return this.listaEmprestimos.find(emprestimo => emprestimo.id === id);
    }
    emprestimosEmAberto(usuarioId) {
        return this.listaEmprestimos.filter(emprestimo => emprestimo.usuarioId === usuarioId && !emprestimo.dataDevolucao).length;
    }
}
exports.EmprestimoRepository = EmprestimoRepository;
