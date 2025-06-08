"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueRepository = void 0;
class EstoqueRepository {
    constructor() {
        this.listaEstoques = [];
    }
    static getInstance() {
        if (!EstoqueRepository.instance) {
            EstoqueRepository.instance = new EstoqueRepository();
        }
        return EstoqueRepository.instance;
    }
    getListaEstoques() {
        return this.listaEstoques;
    }
    addEstoqueNovo(estoque) {
        this.listaEstoques.push(estoque);
    }
    addEstoqueExistente(livroId, quantidade) {
        const estoque = this.listaEstoques.find(e => e.livroId === livroId);
        if (estoque) {
            estoque.quantidade += quantidade;
        }
    }
    getQuantidadeLivro(livroId) {
        const estoque = this.listaEstoques.find(e => e.livroId === livroId);
        return estoque ? estoque.quantidade : 0;
    }
    atualizarDisponibilidade(livroId) {
        const estoque = this.listaEstoques.find(e => e.livroId === livroId);
        if (estoque) {
            estoque.disponivel = estoque.quantidade > estoque.quantidadeEmprestada;
            return estoque;
        }
        else {
            throw new Error(`Estoque para livro com ID ${livroId} não encontrado.`);
        }
    }
    getEstoqueByLivroId(livroId) {
        return this.listaEstoques.find(e => e.livroId === livroId);
    }
    getEstoqueById(id) {
        return this.listaEstoques.find(e => e.id === id);
    }
    atualizarQuantidadeEmprestada(livroId, quantidade) {
        const estoque = this.listaEstoques.find(e => e.livroId === livroId);
        if (estoque) {
            estoque.quantidadeEmprestada += quantidade;
            this.atualizarDisponibilidade(livroId);
        }
        else {
            throw new Error(`Estoque para livro com ID ${livroId} não encontrado.`);
        }
    }
    getEstoqueByCodigo(codigo) {
        const estoque = this.listaEstoques.find(e => e.id === codigo);
        return estoque || null;
    }
    deletarEstoque(codigo) {
        const estoque = this.getEstoqueById(codigo);
        if (!estoque) {
            throw new Error(`Estoque com código ${codigo} não encontrado.`);
        }
        if (estoque.quantidadeEmprestada > 0) {
            throw new Error(`Não é possível remover o estoque com código ${codigo} porque ele está emprestado.`);
        }
        // Remove o estoque da lista
        this.listaEstoques = this.listaEstoques.filter(e => e.id !== codigo);
    }
}
exports.EstoqueRepository = EstoqueRepository;
