"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroRepository = void 0;
class CategoriaLivroRepository {
    constructor() {
        this.listaCategoriasLivros = [];
    }
    static getInstance() {
        if (!CategoriaLivroRepository.instance) {
            CategoriaLivroRepository.instance = new CategoriaLivroRepository();
        }
        return CategoriaLivroRepository.instance;
    }
    getListaCategoriasLivros() {
        return this.listaCategoriasLivros;
    }
    addCategoriaLivro(categoria) {
        this.listaCategoriasLivros.push(categoria);
    }
    getCategoriaLivroById(id) {
        return this.listaCategoriasLivros.find(categoria => categoria.id === id);
    }
}
exports.CategoriaLivroRepository = CategoriaLivroRepository;
