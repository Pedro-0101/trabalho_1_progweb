"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoController = void 0;
const EmprestimoService_1 = require("../service/EmprestimoService");
class EmprestimoController {
    constructor() {
        this.emprestimoService = new EmprestimoService_1.EmprestimoService();
    }
    registrarEmprestimo(req, res) {
        try {
            const novoEmprestimo = this.emprestimoService.registrarEmprestimo(req.body.cpf, req.body.codigoExemplar, new Date());
            res.status(201).json(novoEmprestimo);
        }
        catch (error) {
            res.status(500).json({ message: "Erro ao registrar empréstimo", error });
        }
    }
    listarEmprestimos(req, res) {
        try {
            const emprestimos = this.emprestimoService.listarEmprestimos();
            res.status(200).json(emprestimos);
        }
        catch (error) {
            res.status(500).json({ message: "Erro ao listar empréstimos", error });
        }
    }
    registrarDevolucao(req, res, id) {
        try {
            const emprestimo = this.emprestimoService.registrarDevolucao(parseInt(id));
            res.status(200).json(emprestimo);
        }
        catch (error) {
            res.status(500).json({ message: "Erro ao registrar devolução", error });
        }
    }
}
exports.EmprestimoController = EmprestimoController;
