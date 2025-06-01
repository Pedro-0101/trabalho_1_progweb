"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroRepository = void 0;
class LivroRepository {
    constructor() {
        this.listaLivros = [];
    }
    static getInstance() {
        if (!LivroRepository.instance) {
            LivroRepository.instance = new LivroRepository();
        }
        return LivroRepository.instance;
    }
    getListaLivros() {
        return this.listaLivros;
    }
    addLivro(livro) {
        this.listaLivros.push(livro);
    }
    getLivroById(id) {
        if (id < 0) {
            throw new Error("ID inválido");
        }
        if (id >= this.listaLivros.length) {
            throw new Error("Livro não encontrado");
        }
        if (this.listaLivros.length === 0) {
            throw new Error("Nenhum livro cadastrado");
        }
        const livro = this.listaLivros.find(l => l.id === id);
        if (!livro) {
            throw new Error(`Livro com ID ${id} não encontrado`);
        }
        return livro;
    }
}
exports.LivroRepository = LivroRepository;
