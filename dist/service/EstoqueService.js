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
exports.EstoqueService = void 0;
const Estoque_1 = require("../model/entity/Estoque");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const LivroService_1 = require("./LivroService");
class EstoqueService {
    constructor() {
        this.estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
        this.livroService = new LivroService_1.LivroService();
    }
    registrarEstoque(livroId, quantidade) {
        return __awaiter(this, void 0, void 0, function* () {
            // Busca o livro pelo id
            const livro = yield this.livroService.getLivroById(livroId);
            if (!livro)
                throw new Error('Livro invalido.');
            // Cria instância temporária apenas para validação
            const estoqueTemp = new Estoque_1.Estoque(livro.id, quantidade, true);
            // Persiste e obtém o ID gerado
            const id = yield this.estoqueRepository.insertEstoque(estoqueTemp);
            // Retorna nova instância com ID preenchido
            return new Estoque_1.Estoque(livro.id, quantidade, true, 0, id);
        });
    }
    getEstoqueByLivroId(livro_id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!livro_id)
                throw new Error('Id do livro invalido.');
            return this.estoqueRepository.getEstoqueByLivroId(livro_id);
        });
    }
    atualizarQuantidadeEmprestada(livro_id, quantidade) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!livro_id)
                throw new Error('Id do livro invalido.');
            if (!quantidade)
                throw new Error('Quantidade invalida.');
            const exemplar = yield this.getEstoqueByLivroId(livro_id);
            if (!exemplar)
                throw new Error('Exemplar invalido.');
            const qtde_atualizada = (exemplar === null || exemplar === void 0 ? void 0 : exemplar.quantidadeEmprestada) + quantidade;
            return yield this.estoqueRepository.atualizarQuantidadeEmprestada(exemplar.id, qtde_atualizada);
        });
    }
    getEstoqueDisponivel(disponivel, livroId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.estoqueRepository.getEstoqueDisponivel(disponivel, livroId);
        });
    }
    getEstoqueById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new Error('Id de estoque invalido.');
            return yield this.estoqueRepository.getEstoqueById(id);
        });
    }
}
exports.EstoqueService = EstoqueService;
