import { CategoriaLivro } from "../model/entity/CategoriaLivro";
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";

export class CategoriaLivroService {
    private CategoriaLivroRepository: CategoriaLivroRepository;

    constructor() {
        this.CategoriaLivroRepository = CategoriaLivroRepository.getInstance();
    }

    async criarCategoriaLivro(nome: string): Promise<CategoriaLivro> {
        // Cria instância inicial para validação e consistência
        const categoriaTemp = new CategoriaLivro(nome);

        // Persiste no banco e recebe o ID gerado
        const id = await this.CategoriaLivroRepository.insertCategoriaLivro(categoriaTemp);

        // Retorna categoria de livro
        return new CategoriaLivro(nome, id);
    }

    async getCategoriaLivroById(categoriaId: number): Promise<CategoriaLivro | null> {

        if(!categoriaId)throw new Error('Categoria de livro invalida.');
        return await this.CategoriaLivroRepository.getCategoriaLivroById(categoriaId);

    }

    async getCategoriasLivro(): Promise<CategoriaLivro[] | null> {

        return await this.CategoriaLivroRepository.getCategoriasLivro();

    }

   /* public listarCategorias(): CategoriaLivro[] {
        // Retorna todas as categorias
        return this.CategoriaLivroRepository.getListaCategoriasLivros();
    }*/

}