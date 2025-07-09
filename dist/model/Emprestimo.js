"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emprestimo = void 0;
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
const CategoriaLivroRepository_1 = require("../repository/CategoriaLivroRepository");
class Emprestimo {
    constructor(usuarioId, estoqueId, dataEmprestimo, dataDevolucao, dataEntrega, diasAtraso, suspensaoAte) {
        this.emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
        this.estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
        this.usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
        this.CategoriaLivroRepository = CategoriaLivroRepository_1.CategoriaLivroRepository.getInstance();
        // Valida a data de empréstimo
        if (!(dataEmprestimo instanceof Date)) {
            throw new Error("Data de empréstimo inválida.");
        }
        let id = this.emprestimoRepository.getListaEmprestimos().length + 1;
        this.id = id;
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
