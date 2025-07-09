"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const Estoque_1 = require("../model/Estoque");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const LivroRepository_1 = require("../repository/LivroRepository");
class EstoqueService {
    constructor() {
        this.estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
        this.livroRepository = LivroRepository_1.LivroRepository.getInstance();
    }
    registrarEstoque(isbn, quantidade) {
        let estoque = new Estoque_1.Estoque(isbn, 1, true);
        // Verifica se o estoque foi criado corretamente
        if (!estoque) {
            throw new Error("Erro ao criar o estoque.");
        }
        // Adiciona o estoque ao repositório
        this.estoqueRepository.addEstoqueNovo(estoque);
        // Retorna o estoque criado
        return estoque;
    }
    getListaEstoques() {
        return this.estoqueRepository.getListaEstoques();
    }
    getByCodigo(codigo) {
        return this.estoqueRepository.getEstoqueByCodigo(codigo);
    }
    atualizaDisponibilidade(codigo) {
        const estoque = this.estoqueRepository.getEstoqueByCodigo(codigo);
        if (!estoque) {
            throw new Error("Exemplar não encontrado.");
        }
        this.estoqueRepository.atualizarDisponibilidade(estoque.livroId);
        return estoque;
    }
    deletarEstoque(codigo) {
        const estoque = this.estoqueRepository.getEstoqueByCodigo(codigo);
        if (!estoque) {
            throw new Error("Exemplar não encontrado.");
        }
        this.estoqueRepository.deletarEstoque(codigo);
    }
    getEstoqueId(livroId, isbn) {
        if (livroId) {
            let estoque = this.estoqueRepository.getEstoqueByLivroId(livroId);
            if (estoque) {
                return estoque.id;
            }
            else {
                throw new Error("Estoque nao encontrado");
            }
        }
        if (isbn) {
            let livro = this.livroRepository.getLivroByIsbn(isbn);
            let estoque = this.estoqueRepository.getEstoqueByLivroId(livro.id);
            if (estoque) {
                return estoque.id;
            }
            else {
                throw new Error("Estoque nao encontrado");
            }
        }
        throw new Error("Estoque nao encontrado");
    }
}
exports.EstoqueService = EstoqueService;
