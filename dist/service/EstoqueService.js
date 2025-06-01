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
    criarEstoque(livroId, quantidade) {
        // Verifica se o livro existe
        const livro = this.livroRepository.getListaLivros().find(l => l.id === livroId);
        if (!livro) {
            throw new Error("Livro não existe.");
        }
        // Verifica se a quantidade é válida
        if (quantidade < 0) {
            throw new Error("Quantidade inválida. Deve ser maior ou igual a 0.");
        }
        // Verifica se já existe um estoque para o livro
        const estoqueExistente = this.estoqueRepository.getListaEstoques().find(e => e.livroId === livroId);
        if (estoqueExistente) {
            this.estoqueRepository.addEstoqueExistente(estoqueExistente.id, quantidade);
        }
        // Cria um novo estoque
        let id = this.estoqueRepository.getListaEstoques().length + 1;
        let estoque = new Estoque_1.Estoque(id, livroId, quantidade, 0, true);
        // Verifica se o estoque foi criado corretamente
        if (!estoque) {
            throw new Error("Erro ao criar o estoque.");
        }
        // Adiciona o estoque ao repositório
        this.estoqueRepository.addEstoqueNovo(estoque);
        // Atualiza a disponibilidade do estoque
        this.estoqueRepository.atualizarDisponibilidade(livroId);
        // Retorna o estoque criado
        return estoque;
    }
}
exports.EstoqueService = EstoqueService;
