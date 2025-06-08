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
exports.EstoqueController = void 0;
const EstoqueService_1 = require("../service/EstoqueService");
class EstoqueController {
    constructor() {
        this.estoqueService = new EstoqueService_1.EstoqueService();
    }
    registrarEstoque(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const novoExemplar = yield this.estoqueService.registrarEstoque(req.body.isbn, 1);
                res.status(201).json(novoExemplar);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao cadastrar exemplar', error });
            }
        });
    }
    listarEstoque(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const estoques = this.estoqueService.getListaEstoques();
                res.status(200).json(estoques);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao buscar exemplares', error });
            }
        });
    }
    getByCodigo(codigo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const estoque = this.estoqueService.getByCodigo(codigo);
                return estoque;
            }
            catch (error) {
                throw new Error('Erro ao buscar exemplar');
            }
        });
    }
    atualizaDisponibilidade(codigo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const estoqueAtualizado = this.estoqueService.atualizaDisponibilidade(codigo);
                return estoqueAtualizado;
            }
            catch (error) {
                throw new Error('Erro ao atualizar exemplar');
            }
        });
    }
    deletarEstoque(codigo, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const estoque = this.estoqueService.getByCodigo(codigo);
                if (!estoque) {
                    throw new Error('Exemplar não encontrado');
                }
                this.estoqueService.deletarEstoque(codigo);
                res.status(204).send(); // No content response
            }
            catch (error) {
                console.error('Erro ao remover exemplar:', error);
                res.status(500).json({ message: 'Erro ao remover exemplar', error });
            }
        });
    }
}
exports.EstoqueController = EstoqueController;
