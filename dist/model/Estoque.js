"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estoque = void 0;
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const LivroRepository_1 = require("../repository/LivroRepository");
class Estoque {
    constructor(isbn, quantidade, disponivel) {
        this.estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
        this.livroRepository = LivroRepository_1.LivroRepository.getInstance();
        // Verifica se o livro existe
        const livro = this.livroRepository.getLivroByIsbn(isbn);
        const livroId = livro.id;
        if (!livro) {
            throw new Error("Livro não existe.");
        }
        // Verifica se a quantidade é válida
        if (quantidade < 0) {
            throw new Error("Quantidade inválida. Deve ser maior ou igual a 0.");
        }
        // Verifica se já existe um estoque para o livro
        const estoqueExistente = this.estoqueRepository.getEstoqueByLivroId(livroId);
        if (estoqueExistente) {
            this.estoqueRepository.addEstoqueExistente(estoqueExistente.id, quantidade);
        }
        // Cria um novo estoque
        let id = this.estoqueRepository.getListaEstoques().length + 1;
        this.id = id;
        this.livroId = livroId;
        this.quantidade = quantidade;
        this.quantidadeEmprestada = 0;
        this.disponivel = disponivel;
    }
}
exports.Estoque = Estoque;
