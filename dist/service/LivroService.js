"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroService = void 0;
const Livro_1 = require("../model/Livro");
const LivroRepository_1 = require("../repository/LivroRepository");
const CategoriaLivroRepository_1 = require("../repository/CategoriaLivroRepository");
const textUtil_1 = require("../utils/textUtil");
class LivroService {
    constructor() {
        this.livroRepository = LivroRepository_1.LivroRepository.getInstance();
    }
    criarLivro(titulo, autor, editora, edicao, isbn, categoriaId) {
        titulo = textUtil_1.textUtils.capitalizarTexto(titulo);
        autor = textUtil_1.textUtils.capitalizarTexto(autor);
        editora = textUtil_1.textUtils.capitalizarTexto(editora);
        edicao = textUtil_1.textUtils.capitalizarTexto(edicao);
        isbn = isbn.trim().replace(/[^0-9]/g, ""); // Remove caracteres não numéricos
        // Valida o título do livro
        if (!titulo || titulo.trim() === "" || titulo.length < 3) {
            throw new Error("Título inválido. Deve ter pelo menos 3 caracteres.");
        }
        // Valida o autor do livro
        if (!autor || autor.trim() === "" || autor.length < 3) {
            throw new Error("Autor inválido. Deve ter pelo menos 3 caracteres.");
        }
        // Valida a editora do livro
        if (!editora || editora.trim() === "" || editora.length < 3) {
            throw new Error("Editora inválida. Deve ter pelo menos 3 caracteres.");
        }
        // Valida a edição do livro
        if (!edicao || edicao.trim() === "" || edicao.length < 3) {
            throw new Error("Edição inválida. Deve ter pelo menos 3 caracteres.");
        }
        // Valida o ISBN do livro
        if (!isbn || isbn.trim() === "" || isbn.length < 13) {
            throw new Error("ISBN inválido. Deve ter pelo menos 13 caracteres.");
        }
        // Verifica se a categoria existe
        let categoriaLivro = CategoriaLivroRepository_1.CategoriaLivroRepository.getInstance().getListaCategoriasLivros().find(categoria => categoria.id === categoriaId);
        if (!categoriaLivro) {
            throw new Error("Categoria não encontrada.");
        }
        // Verifica se o livro já existe
        if (this.livroRepository.getListaLivros().some(livro => livro.titulo === titulo
            && livro.edicao === edicao
            && livro.autor === autor
            && livro.editora === editora
            && livro.isbn === isbn)) {
            throw new Error("Livro já cadastrado.");
        }
        // Cria um novo livro com um ID único
        let id = this.livroRepository.getListaLivros().length + 1;
        let livro = new Livro_1.Livro(id, titulo, autor, editora, edicao, isbn, categoriaId);
        // Verifica se o livro foi criado corretamente
        if (!livro) {
            throw new Error("Erro ao criar o livro.");
        }
        // Adiciona o livro ao repositório
        this.livroRepository.addLivro(livro);
        // Retorna o livro criado
        return livro;
    }
}
exports.LivroService = LivroService;
