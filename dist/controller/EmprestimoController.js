"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoController = void 0;
const EmprestimoService_1 = require("../service/EmprestimoService");
class EmprestimoController {
    constructor() {
        this.emprestimoService = new EmprestimoService_1.EmprestimoService();
    }
    registrarEmprestimo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const novoEmprestimo = yield this.emprestimoService.registrarEmprestimo(req.body.cpf, req.body.codigoExemplar, new Date());
                res.status(201).json(novoEmprestimo);
            }
            catch (error) {
                res.status(500).json({ message: "Erro ao registrar empréstimo", error });
            }
        });
    }
    listarEmprestimos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emprestimos = yield this.emprestimoService.listarEmprestimos();
                res.status(200).json(emprestimos);
            }
            catch (error) {
                res.status(500).json({ message: "Erro ao listar empréstimos", error });
            }
        });
    }
    registrarDevolucao(req, res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emprestimo = yield this.emprestimoService.registrarDevolucao(parseInt(id));
                res.status(200).json(emprestimo);
            }
            catch (error) {
                res.status(500).json({ message: "Erro ao registrar devolução", error });
            }
        });
    }
}
exports.EmprestimoController = EmprestimoController;
