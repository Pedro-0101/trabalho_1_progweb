"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroService = void 0;
const Livro_1 = require("../model/Livro");
const LivroRepository_1 = require("../repository/LivroRepository");
const EmprestimoService_1 = require("./EmprestimoService");
const EstoqueService_1 = require("./EstoqueService");
class LivroService {
    constructor() {
        this.livroRepository = LivroRepository_1.LivroRepository.getInstance();
    }
    criarLivro(titulo, autor, editora, edicao, isbn, categoriaId) {
        let livro = new Livro_1.Livro(titulo, autor, editora, edicao, isbn, categoriaId);
        // Verifica se o livro foi criado corretamente
        if (!livro) {
            throw new Error("Erro ao criar o livro.");
        }
        // Adiciona o livro ao repositório
        this.livroRepository.addLivro(livro);
        // Retorna o livro criado
        return livro;
    }
    ListarLivrosFiltro(filtroAutor, filtroEditora, filtroCategoria) {
        try {
            let listaLivros;
            listaLivros = this.livroRepository.getListaLivros();
            if (filtroAutor) {
                listaLivros.filter(livro => { livro.autor === filtroAutor; });
            }
            if (filtroEditora) {
                listaLivros.filter(livro => { livro.editora === filtroEditora; });
            }
            if (filtroCategoria) {
                listaLivros.filter(livro => { livro.categoriaId === filtroCategoria; });
            }
            return listaLivros;
        }
        catch (error) {
            throw new Error('Erro ao listar livros com filtro');
        }
    }
    detalhesLivro(isbn) {
        try {
            if (!isbn) {
                throw new Error("Erro ao requisitar detalhes do livro: ISBN invalido: " + isbn);
            }
            const livro = this.livroRepository.getLivroByIsbn(isbn);
            return livro;
        }
        catch (error) {
            throw new Error("Erro ao requisitar detalhes do livro");
        }
    }
    atualizarLivro(titulo, autor, editora, edicao, isbn, categoriaId) {
        try {
            const livroAtualizado = this.livroRepository.atualizarLivro(titulo, autor, editora, edicao, isbn, categoriaId);
            return livroAtualizado;
        }
        catch (error) {
            throw new Error("Erro ao atualizar informacoes do livro");
        }
    }
    deletarLivro(isbn) {
        try {
            const emprestimoService = new EmprestimoService_1.EmprestimoService();
            const estoqueService = new EstoqueService_1.EstoqueService();
            const estoqueId = estoqueService.getEstoqueId(null, isbn);
            let qtdeEmprestada = emprestimoService.qtdeEmprestada(estoqueId);
            if (qtdeEmprestada === 0) {
                estoqueService.deletarEstoque(estoqueId);
                this.livroRepository.deletarLivro(isbn);
            }
            else {
                throw new Error("Erro ao deletar livro, possui empresimos em andamento");
            }
        }
        catch (error) {
            throw new Error("Erro ao deletar livro");
        }
    }
}
exports.LivroService = LivroService;
