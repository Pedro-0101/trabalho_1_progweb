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
        }
        else {
            throw new Error(`Estoque para livro com ID ${livroId} não encontrado.`);
        }
    }
    getEstoqueByLivroId(livroId) {
        return this.listaEstoques.find(e => e.livroId === livroId);
    }
}
exports.EstoqueRepository = EstoqueRepository;
